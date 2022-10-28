const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret = 'dd5f127913bbe2f89b41e4ab9bdb9b3696420e7ae5da224014c5739f6d1565eaa984ee';

// sign up 
exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" });
    }
    bcrypt.hash(password, 8).then(async (hash) =>  {
        await User.create({
            firstName,
            lastName,
            email,
            password: hash
        }).then((user) => {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
                { id: user._id, email, role:user.role },
                jwtSecret,
                {
                    expiresIn: maxAge,
                }
            );
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
            });          
            res.status(200).json({
                message: "User successfully created",
                user: user.firstName,
            });
        })
        .catch((error) =>
            res.status(400).json({
                message: "User not created",
                error: error.mesage,
           })
        );
    });
  };

  //login
  exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "email or password not present",
        });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Login not succesful",
                error: "user not found"
            });
        } else {
            bcrypt.compare(password, user.password).then(function (result){
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                        { id: user._id, email, role: user.role},
                        jwtSecret,
                        {
                            expiresIn: maxAge
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000
                    });
                    res.status(200).json({
                        message: "Login successful",
                        user: user.firstName,
                    });
                } else {
                    res.status(400).json({ message: "Login not successful" })
                }
            });
        } 
    } catch (error) {
        res.status(400).json({
            message: "An error occured",
            error: error.mesage
        });
    }

};

//update 

exports.update = async (req, res, next) => {
    const { role, id } = req.body;

    if (role && id) {
        if (role === "admin") {
            await User.findById(id)
            .then((user) => {
                if (user.role !== "admin") {
                    user.role = role;
                    user.save((err) => {
                        if (err) {
                            return res
                                .status("400")
                                .json({ message: "an error occured", error: err.message});
                            process.exit(1);
                        }
                        res.status("201").json({ message: "Update successful", user });
                    });
                } else {
                    res.status(400).json({ message: "User is already an Admin"});
                }
            })
            .catch((error) => {
                res 
                    .status(400)
                    .json({message: "An error occured", error: error.message });
            });
        } else {
            res.status(400).json({
                message: "User is not authorised",
            });
        }
    } else {
        res.status(400).json({message: "Role or Id not present"})
    }
};

//delete

exports.deleteUser = async (req,res, next) => {
    const { id } = req.body;
    await User.findById(id)
        .then(user => user.remove())
        .then(user =>
            res.status(201).json({ message: "User successfully deleted", user })
        )
        .catch(error =>
            res 
                .status(400)
                .json({ message: "An error occured", error: error.message })
        );
}

exports.getUsers = async (req, res, next) => {
    await User.find({})
        .then((users) => {
            const userFunction = users.map((user) => {
              const container = {};
              container.firstName = user.firstName;
              container.lastName = user.lastName;
              container.email = user.email;
              container.role = user.role;
              container.id = user._id;
            
              return container;
            });
            res.status(200).json({ user: userFunction });
        })
        .catch((err) =>
          res.status(401).json({ message: "Not successful", error: err.message })
        );
};