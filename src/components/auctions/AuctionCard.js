import React, { useContext } from 'react';
import Countdown from 'react-countdown'
import { AuthContext } from '../../context/AuthContext';

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if(completed) return null
  return (
    <div className="col-4 card-group">
      <div className="card shadow-sm">
        <div
          style={{
            height: '320px',
            backgroundImage:`url(${props.item.imgUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
          className="w-130 m-3"
        />
        <div className="card-body">
          <p className="card-title display-6">
            {props.item.title}
          </p>
          <h5>
            {days} days &nbsp;{ hours } hr : {minutes} min : {seconds} sec
          </h5>

          <p className="card-subtitle">{props.item.desc}</p>
          <div className="d-flex justify-content-between">
            <div className="d-flex btn-group align-items-center">
              {
                props?.owner?.email === props?.item?.email ? (
                  <div
                    className="btn btn-outline-secondary"
                    onClick={() => props.endAuction(props.item.id, props.item.imgName)}
                  >
                    Cancel Auction
                  </div>
                ) : props?.owner?.email === props?.item?.curWinner ? (
                  <div className="">
                    wait for other bids
                  </div>
                ) : (
                  <div
                    className="btn btn-outline-secondary"
                    onClick={() => props.bidAuction(props.item.id, props.item.curPrice)}
                  >
                    Bid
                  </div>
                )
              }
            </div>
            <p className="display-6">${props.item.curPrice}</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export const AuctionCard = ({item}) => {
  let durationBeforeExpire = item.duration
  const {currentUser, bidAuction, endAuction} = useContext(AuthContext)
  return (
    <Countdown
      owner={currentUser}
      bidAuction={bidAuction}
      endAuction={endAuction}
      date={durationBeforeExpire}
      item={item}
      renderer={renderer}
    />
  )
};
