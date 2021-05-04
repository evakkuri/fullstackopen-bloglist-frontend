import React from 'react'

const Notification = ({ notifObj }) => {
  if (notifObj === null) {
    return null
  }

  if (!('type' in notifObj) || !('content' in notifObj)) {
    return null
  }

  return (
    <div className={notifObj.type}>
      {notifObj.content}
    </div>
  )
}

export default Notification