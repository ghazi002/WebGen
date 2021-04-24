const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
let projects = require("../models/projects");

// READ (ALL)
router.get("/", (req, res) => {
    projects
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// READ (ONE)
router.get("/:id", (req, res) => {
    projects
    .findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such projects.` });
    });
});



// ADD
router.post("/", (req, res) => {
  console.log(req.body);
  let newProject = new projects({
      
    name: req.body.name,
    path: req.body.path,
   
  });
  newProject
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          name: result.name,
          path: result.path,
        },
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.path) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.path.message });
          return;
        }
        

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
    projects
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
            _id: result._id,
            name: result.name,
            path: result.path,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

router.put("/:id", (req, res) => {
  let updatedProjects = {
    name: req.body.name,
    path: req.body.path,
   
  };

  projects
    .findOneAndUpdate({ _id: req.params.id }, updatedProjects, {
      runValidators: true,
      context: "query",
    })
    .then((oldResult) => {
        projects
        .findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
                _id: result._id,
                name: result.name,
                path: result.path,
            },
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
            res
              .status(400)
              .json({ success: false, msg: err.errors.name.message });
            return;
          }
          if (err.errors.path) {
            res
              .status(400)
              .json({ success: false, msg: err.errors.path.message });
            return;
          }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

module.exports = router;
