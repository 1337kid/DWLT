import React from 'react'

const TransactionCard = ({data,type}) => {
  return (
    <div className='flex flex-col gap-3'>
      {data.map((item) => (<>
        <div className={`bg-slate-200 p-3 text-left border-2 rounded-md ${type === 'received' ? 'border-green-400' : 'border-red-400'}`}>
          <h5 className='text-xl font-semibold'>Amount : {item.amount}</h5>
          <p className='text-sm'>From : {item.from}<br/>
          To : {item.to}
          </p>
        </div>
      </>))}
    </div>
  )
}

export default TransactionCard