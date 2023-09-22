const Alertbox = ({type,message,setterfunc}) => {
  return (
    <div className={`p-4 flex justify-between rounded-md ${type}`}>
      <p>{message}</p>
      <button onClick={setterfunc}>X</button>
    </div>
  ) 
}

export default Alertbox