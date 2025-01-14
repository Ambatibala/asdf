import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer'
import '../css/TeamPlayers.css'
import plus from '../pages/plus.png'
import minus from '../pages/minus.png'

const TeamPlayers = () => {
    var [download, setDownload] = useState("")
    const [players, setPlayers] = useState([])
    const [sponsor, setSponsor] = useState([])
    const [merchData, setMerchData] = useState([])
    // const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
        setDownload(localStorage.getItem("SelectedTeam"))
    }, [])
    useEffect(() => {
        const getTeamData = async (download) => {
            try {
                const response = await axios.post("https://dbms-miniproject.onrender.com/fetch_team_details", {
                    id: download
                });
                setPlayers(response.data)

            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        getTeamData(download)
    }, [download])
    useEffect(() => {
        const getSpnsorData = async (download) => {
            try {
                const sponsor_response = await axios.post("https://dbms-miniproject.onrender.com/sponsor_details", {
                    id: download
                });
                setSponsor(sponsor_response.data)
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        getSpnsorData(download)
    }, [download])
    useEffect(() => {
        const getMerchData = async (download) => {
            try {
                const merch_response = await axios.post("https://dbms-miniproject.onrender.com/fetch_merch", {
                    id: download
                });
                setMerchData(merch_response.data)
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        getMerchData(download)
    }, [download,buymerch,sellmerch])
    function buymerch(x, y) {
        axios.post("https://dbms-miniproject.onrender.com/buy_merch", {
            teamname: x,
            merch_name: y
        });
        
    }
    function sellmerch(x, y) {
        axios.post("https://dbms-miniproject.onrender.com/cancel_merch", {
            teamname: x,
            merch_name: y
        });
    }
    function uploadPlayer(x) {
        localStorage.setItem("SelectedPlayer", x.pname);
        window.location.href = "/player"
    }
    return (
        <div>
            <div className="team-player-main-container">
                <div className="team-player-left">
                    {/* <h1 className='roster'>Sponsors and Merch </h1> */}
                    {/* <img src={imageUrl} alt='hahahah'/> */}
                    <div className="team-player-container">
                        {sponsor.map(spnsr => (
                            <div className='sponsor-container'>
                                <div className='sponsor-name'>{download}</div>
                                <div className="sponsor-amount">Sponsor : {spnsr.sname}</div>
                                <div className='sponsor-amount'>Sponsor amount : ${spnsr.money}</div>
                            </div>
                        ))}
                        {merchData.map(merchandise => (
                            <div className='merch-line'>
                                <div className="merch-nam33e">{merchandise.Product}</div>
                                <div className="merch-nam33e">${merchandise.Price}</div>
                                <img src={plus} className="merch-plus" alt='+' onClick={() => buymerch(download, merchandise.Product)} />
                                <div className="merch-stock">{merchandise.Stock}</div>
                                <img src={minus} className="merch-minus" alt='-' onClick={() => sellmerch(download, merchandise.Product)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="team-player-right">
                    {/* <h1 className='roster'>{download} Player Roster</h1> */}
                    <ul className="player-card-list">
                        {players.map((cardData, index) => (<>
                            <li key={index} className='player-card'>
                                {cardData.captain_status === "Captain" ? <div className='captain-status'></div> : <></>}
                                <Link onClick={() => uploadPlayer(cardData)} className='lonk-plonk'>
                                    <div className='player-roll-animation'>
                                        <div className='filler0image'>
                                            {
                                                cardData.photo != null ?
                                                    <img src={`data:image/png;base64,${Buffer.from(cardData.photo.data).toString('base64')}`} alt={cardData.tname} className='player-image' />
                                                    :
                                                    <img src='https://static.vecteezy.com/system/resources/thumbnails/010/884/730/small_2x/owl-head-mascot-team-logo-png.png' alt='ifk' className='player-image' />
                                            }
                                        </div>
                                        <div className='player-text'>
                                            <h1 className='player-text-header'>{cardData.nickname}</h1>
                                            <p className='player-text-inside'>AKA {cardData.pname}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li></>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TeamPlayers
