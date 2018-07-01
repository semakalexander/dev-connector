const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const { isEmpty } = require('../../helpers');

// @route api/profiles/handle/:handle
// @desc  get profile by handle
// @access public
router.get('/handle/:handle', (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        return res
          .status(404)
          .json({ profile: 'there is no profile for this user' });
      }

      return res.json(profile);
    })
    .catch(err => res.status(500).json(err));
});

// @route api/profiles/user/:id
// @desc  get profile by user id
// @access public
router.get('/user/:id', (req, res) => {
  Profile.findOne({ user: req.params.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        return res
          .status(404)
          .json({ profile: 'there is no profile for this user' });
      }

      return res.json(profile);
    })
    .catch(() =>
      res.status(404).json({ profile: 'there is no profile for this user' })
    );
});

// @route api/profiles
// @desc  get all profiles
// @access public
router.get('/', (req, res) => {
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        return res.status(404).json({ profile: 'there are no profiles yet' });
      }

      return res.json(profiles);
    })
    .catch(() =>
      res.status(404).json({ profile: 'there are no profiles yet' })
    );
});

// @route  api/profiles/current
// @desc   gets current users profile
// @access private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          return res.status(404).json({
            noprofile: 'There is no profile for this user'
          });
        }

        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  api/profiles
// @desc   create or update user profile
// @access private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      user: { id },
      body: {
        handle,
        company,
        website,
        location,
        bio,
        status,
        githubUsername,
        skills,
        youtube,
        facebook,
        linkedin,
        instagram,
        twitter
      }
    } = req;

    const profileFields = {
      user: id
    };

    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUsername) profileFields.githubUsername = githubUsername;

    if (skills) profileFields.skills = skills.split(',');

    const social = {};
    if (youtube) social.youtube = youtube;
    if (facebook) social.facebook = facebook;
    if (linkedin) social.linkedin = linkedin;
    if (instagram) social.instagram = instagram;
    if (twitter) social.twitter = twitter;

    if (!isEmpty(social)) profileFields.social = social;

    Profile.findOne({ user: id })
      .then(profile => {
        if (profile) {
          // update
          Profile.findOneAndUpdate(
            { user: id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => res.status(500).json(err));
        } else {
          // create
          Profile.findOne({ handle })
            .then(profile => {
              if (profile) {
                return res
                  .status(400)
                  .json({ handle: 'That handle already exists' });
              }

              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            })
            .catch(err => res.status(500).json(err));
        }
      })
      .catch();
  }
);

// @route api/profiles/experience
// @desc add experience to profile
// @access private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const {
          title,
          company,
          location,
          from,
          to,
          current,
          description
        } = req.body;

        const newExp = {
          title,
          company,
          location,
          from,
          to,
          current,
          description
        };

        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route api/profiles/education
// @desc add education to profile
// @access private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const {
          school,
          degree,
          fieldOfStudy,
          from,
          to,
          current,
          description
        } = req.body;

        const newEdu = {
          school,
          degree,
          fieldOfStudy,
          from,
          to,
          current,
          description
        };

        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route api/profiles/experience/:exp_id
// @desc delete experience by its id
// @access private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const {
      user: { id: userId },
      params: { exp_id }
    } = req;

    Profile.findOne({ user: userId })
      .then(profile => {
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(exp_id);

        profile.experience.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route api/profiles/education/:edu_id
// @desc delete education by its id
// @access private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const {
      user: { id: userId },
      params: { edu_id }
    } = req;

    Profile.findOne({ user: userId })
      .then(profile => {
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(edu_id);

        profile.education.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route api/profiles/
// @desc delete current profile
// @access private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id: userId } = req.user;
    Profile.findOneAndRemove({ user: req.user.id }, () => {
      User.findByIdAndRemove(userId, () => res.json({ success: true }));
    });
  }
);

module.exports = router;
