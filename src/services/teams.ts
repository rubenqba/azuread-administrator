
import { Team } from '@model/teams'; // Ajusta la ruta según sea necesario

class TeamService {
  private teams: Team[] = [];

  constructor(initialTeams: Team[] = []) {
    this.teams = initialTeams;
  }

  getAllTeams(): Team[] {
    return this.teams;
  }

  getTeamById(id: string): Team | undefined {
    return this.teams.find(team => team.id === id);
  }

  addTeam(team: Team): void {
    if (this.teams.some(t => t.id === team.id)) {
      throw new Error(`Team with id ${team.id} already exists`);
    }
    this.teams.push(team);
  }

  updateTeam(id: string, updatedTeam: Partial<Team>): Team | undefined {
    const teamIndex = this.teams.findIndex(team => team.id === id);
    if (teamIndex === -1) {
      throw new Error(`Team with id ${id} not found`);
    }

    this.teams[teamIndex] = { ...this.teams[teamIndex], ...updatedTeam };
    return this.teams[teamIndex];
  }

  deleteTeam(id: string): void {
    const teamIndex = this.teams.findIndex(team => team.id === id);
    if (teamIndex === -1) {
      throw new Error(`Team with id ${id} not found`);
    }

    this.teams.splice(teamIndex, 1);
  }
}

export default TeamService;