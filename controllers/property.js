const express = require("express");
const Property = require("../models/Property.model");
const Host = require("../models/Host.model");

// CREATE PROPERTY FUNCTION
const createProperty = async (req, res) => {
  const {
    title,
    description,
    location,
    price,
    amenities,
    images,
    rating,
    maxGuests,
  } = req.body;

  // const images = [];
  // if (req.files && req.files.images) {
  //   const imageFiles = Array.isArray(req.files.images)
  //     ? req.files.images
  //     : [req.files.images];

  //   for (const file of imageFiles) {
  //     const result = await cloudinary.uploader.upload(file.path);
  //     images.push(result.secure_url);
  //   }
  //}

  console.log(req.body);

  if (
    !title ||
    !description ||
    !location ||
    !price ||
    !amenities ||
    !maxGuests
  ) {
    return res.status(400).render("properties/create-property", {
      errorMessage: "All fields are mandatory",
    });
  }

  try {
    const owner = req.session.currentHost._id;
    const newProperty = new Property({
      title,
      description,
      location,
      price,
      amenities,
      owner,
      images,
      rating,
      maxGuests,
    });
    const savedProperty = await newProperty.save();
    const updateHost = await Host.findByIdAndUpdate(owner, {
      $push: { createdProperties: savedProperty._id },
    });
    console.log(updateHost);
    //console.log(savedProperty);
    res.status(201).redirect(`/property/${savedProperty._id}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE PROPERTY FUNCTION
const updateProperty = async (req, res) => {
  console.log("booooooddddddyyyyyyy", req.body);
  console.log(req.params);
  try {
    // body
    // if body.images === 0 ? remove the image
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.propertyId,
      {
        $set: req.body,
      },
      { new: true }
    );
    // console.log(updatedProperty);
    res.status(200).redirect(`/property/${updatedProperty._id}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE PROPERTY
const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    await Property.findByIdAndDelete(propertyId);
    res.status(200).redirect("/property");
  } catch (err) {
    res.status(500).json(err);
  }
};

// FIND PROPERTY
const findProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json(property);
  } catch (err) {
    es.status(500).json(err);
  }
};

module.exports = {
  createProperty,
  updateProperty,
  deleteProperty,
  findProperty,
};
