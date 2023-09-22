const OneClickCard = ({item,handleClick}) => {
  return (
    <div key={item._id} className="bg-slate-200 border-2 border-gray-400 p-2 rounded-md flex justify-between align-middle text-left max-[320px]:flex-col">
      <div>
        <h5 className="text-xl font-semibold">{item.title}</h5>
        <p className="text-sm">To : {item.email}<br/>Amount : {item.amount}</p>
      </div>
      <div>
        <button className="sign_in_button" onClick={handleClick}>Pay</button>
      </div>
    </div>
  )
}

export default OneClickCard