/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import './assets/main.scss'
import axios from 'axios'
import { AppBar, Tabs, Tab } from '@mui/material'
import TabPanel from './cmps/tab-panel';


const leagues = [
	{ id: '4328', name: 'English Premier League' },
	{ id: '4331', name: 'German Bundesliga' },
	{ id: '4332', name: 'Italian Serie A' },
	{ id: '4334', name: 'Spanish La Liga' },
	{ id: '4335', name: 'French Ligue 1' },
];

interface ITeam {
	id: number
	name: string
	logo: string
}

interface ITeamApiRes {
	idTeam: string;
	strTeam: string;
	strBadge: string;
}

export default function App() {
	const [value, seetValue] = useState(0)
	const [teams, setTeams] = useState<ITeam[]>([])

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		seetValue(newValue)
	}

	useEffect(() => {
		const fetchTeams = async (leagueName: string) => {
			try {

				const res = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueName}`);
				const teamsData = res.data.teams.map((team: ITeamApiRes) => ({
					id: team.idTeam,
					name: team.strTeam,
					logo: team.strBadge
				}))
				setTeams(teamsData)
			} catch (err) {
				console.log(err)
			}
		}
		fetchTeams(leagues[value].name)
	}, [value])

	return (
		<section className="leagues-index">
			<AppBar position='static'>
				<Tabs value={value} onChange={handleChange}>
					{leagues.map((league) => (
						<Tab key={league.id} label={league.name} />
					))}
				</Tabs>
			</AppBar>
			{leagues.map((league, idx) => (
				<TabPanel value={value} index={idx} key={league.id}>
					<div className="teams">
						{teams.map(team => (
							<div key={team.id} className="team">
								<img src={team.logo} alt={team.name} />
								<p>{team.name}</p>
							</div>
						))}
					</div>
				</TabPanel>
			))}
		</section>
	)
}

