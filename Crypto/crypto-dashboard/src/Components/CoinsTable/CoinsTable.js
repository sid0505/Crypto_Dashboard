import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import { CoinList } from '../../config/api';
import { SingleCoin } from '../../config/api';
import './CoinsTable.css';
import CoinInfo from '../CoinInfo/CoinInfo';
import Pagination from '../Pagination/Pagination';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../../CryptoContext';

const CoinsTable = () => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	// const [coinsByPage, setCoinsByPage] = useState([])

	const itemsPerPage = 10;

	const{ coins, loading, fetchCoins} = CryptoState();	

	useEffect(() => {
		fetchCoins();
	},[])

 	const navigate = useNavigate();

	if (!coins) return (
			<h1>LOADING...</h1>
			);

	const filteredcoins = coins.filter((c)=>
		c.name.toLowerCase().includes(search.toLowerCase())||c.symbol.toLowerCase().includes(search.toLowerCase())
	)

	const allPages = Math.ceil(filteredcoins.length / itemsPerPage);

	const onPageChange = (page: number = 1) => {
    	setPage(page);
	}

	const items = filteredcoins?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((coin) => {
		return(
				<div className="coin-container">
					<div className="coin-row"
						onClick={() => navigate (`/crypto-dashboard-v2/coins/${coin.id}`)}
                    	key={coin.name}>
						<div className="coin">
							<img
								src={coin?.image}
								alt={coin.name}/>
							<h1>{coin.name}</h1>
							<p className="coin-symbol">{coin.symbol?.toUpperCase()}</p>
						</div>
						<div className="coin-data">
							<p className="coin-price">{coin.current_price?.toLocaleString('en-IN', {style:'currency', currency:'INR'}) }</p>
							<p className="coin-volume">{coin.total_volume?.toLocaleString('en-IN', {style:'currency', currency:'INR'})}
							</p>
							{coin.price_change_percentage_24h < 0 ?(
								<p className="coin-percent red">{coin.price_change_percentage_24h?.toFixed(2)}%</p>
								)
								:(
								<p className="coin-percent green">+{coin.price_change_percentage_24h?.toFixed(2)}%</p>
								)	
							}
							{/*<Coininfo coin={coin}/>*/}
							<p className="coin-marketcap">Mkt Cap:{coin.market_cap.toLocaleString('en-IN', {style:'currency', currency:'INR'})}</p>
						</div>
					</div>
				</div>
		)
	})

	return(
		<div className="list-container">
			<div className="coin-search">
    		    <h1 className="coin-text">Search a Currency</h1>
    		    <form>
    		    	<input 
    		      		type="text" 
    		      		className="coin-input" 
    		      		placeholder="Search" 
    		      		onChange={(event)=>setSearch(event.target.value)} 
    		    	/>
    		    </form>
    		</div>
    		<div>
				{items}
			</div>
			<Pagination allPagesNumber={allPages} itemsPerPage={10} itemsNumber={filteredcoins.length} pageChange={onPageChange}/>
		</div>
		)
}

export default CoinsTable