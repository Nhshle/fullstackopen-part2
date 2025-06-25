const Notification = ({messages}) => {
  if (!messages.errorMsg && !messages.successMsg){
    return null
  }
  return (
    <>
      {messages.errorMsg && (
        <div className='error'>{messages.errorMsg}</div>
      )}
      {messages.successMsg && (
        <div className='success'>{messages.successMsg}</div>
      )}
    </>
  )
}

export default Notification

