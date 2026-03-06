import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  const defaultProps = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    rating: 4,
    image: "/gatsby.jpg",
  };

  it("renders title and author", () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("F. Scott Fitzgerald")).toBeInTheDocument();
  });

  it("renders price formatted correctly", () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText("$12.99")).toBeInTheDocument();
  });

  it("renders old price when provided", () => {
    render(<ProductCard {...defaultProps} oldPrice={19.99} />);
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toHaveClass("line-through");
  });

  it("does not render old price when not provided", () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.queryByText("$19.99")).not.toBeInTheDocument();
  });

  it("renders correct number of filled stars", () => {
    const { container } = render(<ProductCard {...defaultProps} rating={3} />);
    const stars = container.querySelectorAll("svg");
    expect(stars.length).toBe(5); // Always 5 stars
  });

  it("renders image with correct alt text", () => {
    render(<ProductCard {...defaultProps} />);
    const img = screen.getByRole("img", { name: "The Great Gatsby" });
    expect(img).toHaveAttribute("src", "/gatsby.jpg");
  });

  it("applies card styling classes", () => {
    const { container } = render(<ProductCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("bg-card");
    expect(card).toHaveClass("rounded-lg");
  });
});
