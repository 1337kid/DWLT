const CustBtn = ({onClickFunc,text,type}) => {
  return (
    <div>
      <button type={type || 'button'} className="bg-sky-300 hover:bg-sky-400 p-2 rounded-md" onClick={onClickFunc}>{text}</button>
    </div>
  )
}

export default CustBtn