// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v3.20.3
// source: category.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Category, Empty } from "./common";

export const protobufPackage = "category";

export interface CreateCategoryRequest {
  name: string;
}

export interface GetCategoryByIdRequest {
  id: number;
}

export interface UpdateCategoryRequest {
  id: number;
  name: string;
}

export interface DeleteCategoryRequest {
  id: number;
}

export interface GetAllCategoriesResponse {
  categories: Category[];
}

export const CATEGORY_PACKAGE_NAME = "category";

export interface CategoryServiceClient {
  getAllCategories(request: Empty, metadata: Metadata, ...rest: any): Observable<GetAllCategoriesResponse>;

  getCategoryById(request: GetCategoryByIdRequest, metadata: Metadata, ...rest: any): Observable<Category>;

  createCategory(request: CreateCategoryRequest, metadata: Metadata, ...rest: any): Observable<Category>;

  updateCategory(request: UpdateCategoryRequest, metadata: Metadata, ...rest: any): Observable<Category>;

  deleteCategory(request: DeleteCategoryRequest, metadata: Metadata, ...rest: any): Observable<Empty>;
}

export interface CategoryServiceController {
  getAllCategories(
    request: Empty,
    metadata: Metadata,
    ...rest: any
  ): Promise<GetAllCategoriesResponse> | Observable<GetAllCategoriesResponse> | GetAllCategoriesResponse;

  getCategoryById(
    request: GetCategoryByIdRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<Category> | Observable<Category> | Category;

  createCategory(
    request: CreateCategoryRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<Category> | Observable<Category> | Category;

  updateCategory(
    request: UpdateCategoryRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<Category> | Observable<Category> | Category;

  deleteCategory(
    request: DeleteCategoryRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<Empty> | Observable<Empty> | Empty;
}

export function CategoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getAllCategories",
      "getCategoryById",
      "createCategory",
      "updateCategory",
      "deleteCategory",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CategoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CategoryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CATEGORY_SERVICE_NAME = "CategoryService";
