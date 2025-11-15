import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";
import mockingoose from "mockingoose";

import studentRoutes from "../routes/studentRoutes.js";
import Student from "../models/studentModel.js";

// Prevent real MongoDB connection
jest.mock("mongoose", () => {
  const actual = jest.requireActual("mongoose");
  return {
    ...actual,
    connect: jest.fn(),  // Block actual DB connection
  };
});

const app = express();
app.use(express.json());
app.use("/students", studentRoutes);

describe("Student Routes", () => {
  test("GET /students should return array", async () => {
    // Mock DB output
    mockingoose(Student).toReturn(
      [
        { name: "Test", email: "test@gmail.com", branch: "CSE" }
      ],
      "find"
    );

    const res = await request(app).get("/students");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});
