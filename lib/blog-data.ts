// Blog post type definition
export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  image?: string;
}

// Import individual blog posts
import { EthernautCTFChallengesWriteups } from "./blogs/EthernautCTFChallengesWriteups";
import { GreyCatTheFlag2025RationalChallengeWriteup } from "./blogs/GreyCatTheFlag2025RationalChallengeWriteup";
import { GCCCTF2024web3CTFChallengeWriteUp } from "./blogs/GCCCTF2024web3CTFChallengeWriteUp";

// Export all blogs as an array
export const blogs: Blog[] = [
  EthernautCTFChallengesWriteups,
  GreyCatTheFlag2025RationalChallengeWriteup,
  GCCCTF2024web3CTFChallengeWriteUp,
];
