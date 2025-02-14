import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import "../app/globals.css"; // Import the global styles

const HandleTeams = () => {
  const [teamNumber, setTeamNumber] = useState<number | null>(null);
  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [response, setResponse] = useState<Record<string, unknown> | null>(
    null
  );
  const [deleteTeamNumber, setDeleteTeamNumber] = useState<number | null>(null);
  const [deleteResponse, setDeleteResponse] = useState<Record<
    string,
    unknown
  > | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = nookies.get(null);
    if (!cookies["admin-auth"]) {
      router.push("/loginPage");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/handleCell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamNumber,
        teamName,
        teamImage,
        problemStatement,
      }),
    });
    const data = await res.json();
    setResponse(data);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/handleCell", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamNumber: deleteTeamNumber }),
    });
    const data = await res.json();
    setDeleteResponse(data);
  };

  return (
    <div className="container">
      <div className="api-page">
        <h1 className="heading">Check In Team</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="teamNumber">
              Team <span className="highlight"> Number </span>
            </label>
            <input
              id="teamNumber"
              type="number"
              value={teamNumber ?? ""}
              onChange={(e) => setTeamNumber(Number(e.target.value))}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamName">
              Team <span className="highlight">Name</span>
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamImage">
              Team <span className="highlight">Image</span>
            </label>
            <input
              id="teamImage"
              type="text"
              value={teamImage}
              onChange={(e) => setTeamImage(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="problemStatement">
              Problem <span className="highlight">Statement</span>
            </label>
            <textarea
              id="problemStatement"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              required
              className="input-field"
              rows={4}
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        {response && (
          <div className="response-container">
            <h2 className="response-heading">Response</h2>
            <div className="response-content">
              <pre className="response-pre">{JSON.stringify(response, null, 2)}</pre>
            </div>
          </div>
        )}
        <h2 className="heading">Check out Team</h2>
        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label htmlFor="deleteTeamNumber">Team <span className="highlight">Number</span></label>
            <input
              id="deleteTeamNumber"
              type="number"
              value={deleteTeamNumber ?? ""}
              onChange={(e) => setDeleteTeamNumber(Number(e.target.value))}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="button">
            Delete
          </button>
        </form>
        {deleteResponse && (
          <div className="response-container">
            <h2 className="response-heading">Delete Response</h2>
            <div className="response-content">
              <pre>{JSON.stringify(deleteResponse, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleTeams;
