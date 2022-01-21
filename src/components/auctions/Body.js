import React, {useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { AddAuction } from './AddAuction';
import { ProgressBar } from './ProgressBar';
import { AuctionCard } from './AuctionCard';
import Alert from 'react-bootstrap/Alert'

export const AuctionBody = () => {
  const [ auction, setAuction] = useState(null)
  const {currentUser, globalMsg} = useContext(AuthContext)
  const {docs } = useFirestore('auctions')

  console.log(docs);
  return (
    <>
      <div className="py-5">
        <div className="container">
        {
          auction && <ProgressBar auction={auction} setAuction={setAuction} />
        }

        {
          ! currentUser && globalMsg && <Alert variant="info">{globalMsg}</Alert>
        }

        {
          currentUser && (
            <div className="mb-5">
              <AddAuction setAuction={setAuction} />
            </div>
          )

        }

        {
          docs && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {
                docs.map((doc) => {
                  return <AuctionCard item={doc} key={doc.id} />
                })
              }
            </div>
          )
        }
        </div>
      </div>
    </>
  )
};
