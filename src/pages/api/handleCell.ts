import { NextApiRequest, NextApiResponse } from 'next';

interface Team {
  teamNumber: number;
  teamName: string;
  teamImage?: string;
  problemStatement: string;
}

let activeTeams: Team[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { teamNumber, teamName, teamImage, problemStatement } = req.body;
    if (typeof teamNumber === 'number' && teamNumber >= 1 && teamNumber <= 320 &&
        typeof teamName === 'string' && typeof problemStatement === 'string') {
      const existingTeam = activeTeams.find(team => team.teamNumber === teamNumber);
      if (!existingTeam) {
        activeTeams.push({ teamNumber, teamName, teamImage, problemStatement });
      } else {
        existingTeam.teamName = teamName;
        existingTeam.teamImage = teamImage;
        existingTeam.problemStatement = problemStatement;
      }
      res.status(200).json({ success: true, activeTeams });
    } else {
      res.status(400).json({ success: false, message: 'Invalid data' });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ activeTeams });
  } else if (req.method === 'DELETE') {
    const { teamNumber } = req.body;
    if (typeof teamNumber === 'number' && teamNumber >= 1 && teamNumber <= 320) {
      activeTeams = activeTeams.filter(team => team.teamNumber !== teamNumber);
      res.status(200).json({ success: true, activeTeams });
    } else {
      res.status(400).json({ success: false, message: 'Invalid team number' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}