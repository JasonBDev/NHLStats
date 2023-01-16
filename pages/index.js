import axios from "axios";
import { useEffect, useState } from "react";
import { getLogoByAbbr } from "@/lib/teamLogos";
import moment from "moment";

export default function Home() {

  const [schedule, setSchedule] = useState([]);
  const [selectedGame, setSelectedGame] = useState(0);
  const [homeTeamStats, setHomeTeamStats] = useState(null);
  const [awayTeamStats, setAwayTeamStats] = useState(null);

  useEffect(() => {
    async function init() {
      const res = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule?startDate=2023-1-16&endDate=2023-1-16');

      const arr = [];

      if (res.status == 200) {
        res.data.dates.map((date, x) => {
          date.games.map((game, y) => {
            arr.push(game);
          })
        })
        console.log(arr);
        setSchedule(arr);
      }
    }
    init()
  }, [])

  useEffect(() => {
    async function fetchTeamStats() {

      setHomeTeamStats(null);
      setAwayTeamStats(null);

      if (typeof schedule[selectedGame] == 'undefined') return;

      const homeTeamRes = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${schedule[selectedGame].teams.home.team.id}/stats`);
      const awayTeamRes = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${schedule[selectedGame].teams.away.team.id}/stats`);
      setHomeTeamStats(homeTeamRes.data.stats[0].splits[0].stat)
      setAwayTeamStats(awayTeamRes.data.stats[0].splits[0].stat)
      console.log(homeTeamRes.data.stats[0].splits[0].stat);
      console.log(awayTeamRes.data.stats[0].splits[0].stat);

    }
    fetchTeamStats();
  }, [selectedGame, schedule])

  return (
    <div className='flex flex-col h-screen'>
      <div className="flex items-center h-16 w-full bg-black border-b border-[rgb(51,51,51)] fixed">
        <h1 className='text-white text-2xl font-medium w-full text-left w-64 text-center'>NHLStats</h1>
      </div>
      <div className="flex">

        <div className="fixed h-screen overflow-y-auto pb-20 flex flex-col space-y-2 shrink-0 w-64 p-4 mt-16 scrollbar scrollbar-thumb-[rgb(51,51,51)] scrollbar scrollbar-hide">
          {schedule.map((game, i) => {
            return (
              <div key={i} onClick={() => setSelectedGame(i)} className={"bg-black rounded-xl flex flex-col border cursor-pointer hover:bg-[rgb(21,21,21)] border-[rgb(51,51,51)] py-3 " + (i == selectedGame ? 'bg-[rgb(21,21,21)] border-' : 'bg-black')}>
                <div className="flex">
                  <div className="flex flex-col w-1/2 items-center">
                    <div className="w-10 h-10">
                      {getLogoByAbbr(game.teams.away.team.name.match(/\b([A-Z])/g).join(''))}
                    </div>
                    <h1 className="text-white">{game.teams.away.team.name.match(/\b([A-Z])/g).join('')}</h1>
                    <p className="text-gray-500 text-xs">({game.teams.away.leagueRecord.wins} - {game.teams.away.leagueRecord.losses} - {game.teams.away.leagueRecord.ot})</p>
                  </div>
                  <div className="flex flex-col w-1/2 items-center">
                    <div className="w-10 h-10">
                      {getLogoByAbbr(game.teams.home.team.name.match(/\b([A-Z])/g).join(''))}
                    </div>
                    <h1 className="text-white">{game.teams.home.team.name.match(/\b([A-Z])/g).join('')}</h1>
                    <p className="text-gray-500 text-xs">({game.teams.home.leagueRecord.wins} - {game.teams.home.leagueRecord.losses} - {game.teams.home.leagueRecord.ot})</p>
                  </div>
                </div>
                <p className="text-gray-300 text-center w-full border-t border-[rgb(51,51,51)] mt-4 pt-2 text-sm">{moment(new Date(game.gameDate)).format('h:mmA')}</p>
              </div>
            )
          })}
        </div>

        {
          schedule.length != 0 &&
          <div className='w-full bg-[rgb(17,17,17)] min-h-screen mt-16 pl-64'>

            <div className="p-4 w-full flex flex-col items-center">
              <div className="flex w-auto space-x-12 mt-16">
                <div className="flex flex-col items-center">
                  {getLogoByAbbr(schedule[selectedGame].teams.away.team.name.match(/\b([A-Z])/g).join(''))}
                  <div className="flex flex-col items-center">
                    <h1 className="text-white">{schedule[selectedGame].teams.away.team.name}</h1>
                    <p className="text-gray-500 text-xs">({schedule[selectedGame].teams.away.leagueRecord.wins} - {schedule[selectedGame].teams.away.leagueRecord.losses} - {schedule[selectedGame].teams.away.leagueRecord.ot})</p>
                  </div>

                  <div className="flex flex-col divide-y divide-[rgb(21,21,21)] bg-[rgb(7,7,7)] border border-[rgb(51,51,51)] w-72 h-fit mt-16 rounded-xl">
                    {awayTeamStats != null &&
                      <>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Goals</h1>
                          <h1 className="text-gray-200 px-4 py-2">{awayTeamStats.goalsPerGame}</h1>
                        </div>
                        <div className="flex justify-between bg-[rgb(18,18,18)]">
                          <h1 className="text-white px-4 py-2">Goals against</h1>
                          <h1 className="text-gray-200 px-4 py-2">{awayTeamStats.goalsAgainstPerGame}</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Powerplays</h1>
                          <h1 className="text-gray-200 px-4 py-2">{awayTeamStats.powerPlayGoals}/{awayTeamStats.powerPlayOpportunities}</h1>
                        </div>
                        <div className="flex justify-between bg-[rgb(18,18,18)]">
                          <h1 className="text-white px-4 py-2">Penaltykill</h1>
                          <h1 className="text-gray-200 px-4 py-2">{awayTeamStats.penaltyKillPercentage}%</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Shots</h1>
                          <h1 className="text-gray-200 px-4 py-2">{awayTeamStats.shotsPerGame}</h1>
                        </div>
                        <div className="flex justify-between bg-[rgb(18,18,18)]">
                          <h1 className="text-white px-4 py-2">Shots Allowed</h1>
                          <h1 className="text-gray-200 px-4 py-2">{awayTeamStats.shotsAllowed}</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Win Score First</h1>
                          <h1 className="text-gray-200 px-4 py-2">{awayTeamStats.winScoreFirst}</h1>
                        </div>
                        <div className="flex justify-between bg-[rgb(18,18,18)]">
                          <h1 className="text-white px-4 py-2">Win Opp Score First</h1>
                          <h1 className="text-gray-200 px-4 py-2">{awayTeamStats.winOppScoreFirst}</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Save Percentage</h1>
                          <h1 className="text-gray-200 px-4 py-2">{awayTeamStats.savePctg}</h1>
                        </div>
                      </>
                    }
                  </div>
                </div>

                <div className="flex flex-col items-center mt-10">
                  <h1 className="text-gray-100 font-bold">VS</h1>
                  <p className="text-gray-300 text-center w-full border-t border-[rgb(51,51,51)] mt-2 pt-2 text-sm">{moment(new Date(schedule[selectedGame].gameDate)).format('h:mmA')}</p>
                </div>

                <div className="flex flex-col items-center">
                  {getLogoByAbbr(schedule[selectedGame].teams.home.team.name.match(/\b([A-Z])/g).join(''))}
                  <div className="flex flex-col items-center">
                    <h1 className="text-white">{schedule[selectedGame].teams.home.team.name}</h1>
                    <p className="text-gray-500 text-xs">({schedule[selectedGame].teams.home.leagueRecord.wins} - {schedule[selectedGame].teams.home.leagueRecord.losses} - {schedule[selectedGame].teams.home.leagueRecord.ot})</p>
                  </div>

                  <div className="flex flex-col divide-y divide-[rgb(21,21,21)] bg-[rgb(7,7,7)] border border-[rgb(51,51,51)] w-72 h-fit mt-16 rounded-xl">
                    {homeTeamStats != null &&
                      <>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Goals</h1>
                          <h1 className="text-gray-200 px-4 py-2">{homeTeamStats.goalsPerGame}</h1>
                        </div>
                        <div className="flex justify-between bg-[rgb(18,18,18)]">
                          <h1 className="text-white px-4 py-2">Goals against</h1>
                          <h1 className="text-gray-200 px-4 py-2">{homeTeamStats.goalsAgainstPerGame}</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Powerplays</h1>
                          <h1 className="text-gray-200 px-4 py-2">{homeTeamStats.powerPlayGoals}/{homeTeamStats.powerPlayOpportunities}</h1>
                        </div>
                        <div className="flex justify-between bg-[rgb(18,18,18)]">
                          <h1 className="text-white px-4 py-2">Penaltykill</h1>
                          <h1 className="text-gray-200 px-4 py-2">{homeTeamStats.penaltyKillPercentage}%</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Shots</h1>
                          <h1 className="text-gray-200 px-4 py-2">{homeTeamStats.shotsPerGame}</h1>
                        </div>
                        <div className="flex justify-between bg-[rgb(18,18,18)]">
                          <h1 className="text-white px-4 py-2">Shots Allowed</h1>
                          <h1 className="text-gray-200 px-4 py-2">{homeTeamStats.shotsAllowed}</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Win Score First</h1>
                          <h1 className="text-gray-200 px-4 py-2">{homeTeamStats.winScoreFirst}</h1>
                        </div>
                        <div className="flex justify-between bg-[rgb(18,18,18)]">
                          <h1 className="text-white px-4 py-2">Win Opp Score First</h1>
                          <h1 className="text-gray-200 px-4 py-2">{homeTeamStats.winOppScoreFirst}</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-white px-4 py-2">Save Percentage</h1>
                          <h1 className="text-gray-200 px-4 py-2">{homeTeamStats.savePctg}</h1>
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
