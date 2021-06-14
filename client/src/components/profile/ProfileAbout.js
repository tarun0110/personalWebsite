import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile: {
    bio, 
    user: {name} 
}}) => {
    return (
        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>
            {bio}
          </p>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
