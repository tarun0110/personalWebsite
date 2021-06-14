import React from 'react'
import PropTypes from 'prop-types'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const ProfileTop = ({ profile: {
    status,
    company, 
    location,
    user: {name, avatar}
}}) => {
    return (
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={avatar}
            alt=""
          />
          <h1 class="large">{name}</h1>
          <p class="lead">{status} {company && <span> at {capitalizeFirstLetter(company)}</span>}</p>
          <p>{location && <span>{capitalizeFirstLetter(location)}</span>}</p>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
