import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { HistoricalChart } from '../../config/api';
import { chartDays } from '../../config/data';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2';
import SelectButton from '../SelectButton/SelectButton'
import './Coininfo.css'

const CoinInfo = ({coin}) => {

	const [historicalData, setHistoricalData] = useState();
	const [days, setDays] = useState(1)
	// const { coin } = this.props;

	const fetchHistoricalData = async() => {
		const { data } = await axios.get(HistoricalChart(coin.id, days));
		setHistoricalData(data.prices);
	}

	useEffect(() => {
		fetchHistoricalData();
	}, [days])


	return (
		<div className="chart-container">
			{
			!historicalData?(
				<h2>LOADING...</h2>
				):(
					<div className="chart-display">
						<Line
            				data={{
            				  labels: historicalData.map((coin) => {
            				    let date = new Date(coin[0]);
            				    let time =
            				      date.getHours() > 12
            				        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            				        : `${date.getHours()}:${date.getMinutes()} AM`;
            				    return days === 1 ? time : date.toLocaleDateString();
            				  }),

            				  datasets: [
            				    {
            				      data: historicalData.map((coin) => coin[1]),
            				      label: `Price ( Past ${days} Days ) in INR`,
            				      borderColor: "#EEBC1D",
            				    },
            				  ],
            				}}
            				options={{
            				  elements: {
            				    point: {
            				      radius: 1,
            				    },
            				  },
            				}}
            			/>
            			<div className="buttons-container">
            				{chartDays.map(day=>(
            					<div>
            					<SelectButton
            						key={day.value}
                  					onClick={() => setDays(day.value)}
                  					selected={day.value === days}>
            						{day.label}
            					</SelectButton>
            					</div>)
            				)}
            			</div>
            		</div>
				)
			}			
			</div>
	)
}

export default CoinInfo