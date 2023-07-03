const express = require("express");
const Property = require("../models/Property.model");

// CREATE PROPERTY FUNCTION
const createProperty = async (req, res) => {
  const {
    title,
    description,
    location,
    price,
    amenities,
    owner,
    images,
    rating,
  } = req.body;

  try {
    const newProperty = new Property({
      title,
      description,
      location,
      price,
      amenities,
      owner,
      images,
      rating,
    });

    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !amenities ||
      !images
    ) {
      return res.status(400).render("create-property", {
        errorMessage: "All fields are mandatory",
      });
    }

    const savedProperty = await newProperty.save();
    res.status(201).redirect(`/property/${savedProperty._id}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE PROPERTY FUNCTION
const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate();
    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createProperty, updateProperty };
