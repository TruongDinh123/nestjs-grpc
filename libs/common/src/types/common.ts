// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v3.20.3
// source: common.proto

/* eslint-disable */

export const protobufPackage = "common";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User | undefined;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  address?: Address | undefined;
  currentHashedRefreshToken?: string | undefined;
  posts: Post[];
}

export interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
}

export const COMMON_PACKAGE_NAME = "common";
