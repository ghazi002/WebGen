const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
let interfaces = require("../models/interfaces");

// READ (ALL)
router.get("/", (req, res) => {
    interfaces
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
    interfaces
    .findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such interfaces.` });
    });
});

// READ (ONE WITH ID-Project)
router.get("/findByIdPro/:id", (req, res) => {
    interfaces
      .find({ idPro: req.params.id })
      .then((result) => {
        success: true, res.json(result);
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: `No such project.` });
      });
  });

// ADD
router.post("/", (req, res) => {
  console.log(req.body);
  let newInterface= new interfaces({
    idInt:req.body.idInt,
    idPro:req.body.idPro,
    path: req.body.path,
   
  });
  newInterface
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          idInt: result.idInt,
          idPro: result.idPro,
          path: result.path,
        },
      });
    })
    .catch((err) => {
      if (err.errors) {
       
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
    interfaces
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
            _id: result._id,
            idInt: result.idInt,
            idPro: result.idPro,
            path: result.path,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

router.put("/:id", (req, res) => {
  let updatedInterfaces = {
    idInt:req.body.idInt,
    idPro:req.body.idPro,
    path: req.body.path,
  };

  interfaces
    .findOneAndUpdate({ _id: req.params.id }, updatedInterfaces, {
      runValidators: true,
      context: "query",
    })
    .then((oldResult) => {
        interfaces
        .findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
                _id: result._id,
                 idInt: result.idInt,
                 idPro: result.idPro,
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
