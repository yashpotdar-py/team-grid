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

  const problemStatements = [
    "AS-1",
    "AS-2",
    "AS-4",
    "AS-5",
    "DM-1",
    "DM-3",
    "EN-1",
    "EN-2",
    "EN-3",
    "EN-4",
    "EN-5",
    "ET-1",
    "ET-2",
    "ET-3",
    "ET-4",
    "ET-5",
    "HC-1",
    "HC-2",
    "HC-3",
    "HC-4",
    "HC-5",
    "SI-1",
    "TS-1",
    "TS-3",
  ];

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
    // Clear the form and response
    setTeamNumber(null);
    setTeamName("");
    setTeamImage("");
    setProblemStatement("");
    setTimeout(() => setResponse(null), 5000); // Clear response after 5 seconds
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
    // Clear the form and response
    setDeleteTeamNumber(null);
    setTimeout(() => setDeleteResponse(null), 5000); // Clear response after 5 seconds
  };

  return (
    <div className="container">
      <div className="api-page">
        <h1 className="heading" style={{ fontSize: "4rem" }}>
          Check In Team
        </h1>
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
              type="file"
              value={teamImage}
              onChange={(e) => setTeamImage(e.target.value)}
              className="input-field input-image"
            />
          </div>
          <div className="form-group">
            <label htmlFor="problemStatement">
              Problem <span className="highlight">Statement</span>
            </label>
            <select
              id="problemStatement"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              required
              className="input-field"
            >
              <option value="" disabled>
                Select a problem statement
              </option>
              {problemStatements.map((statement) => (
                <option key={statement} value={statement}>
                  {statement}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        {response && (
          <div className="response-container">
            <h2 className="response-heading" style={{ fontSize: "4rem" }}>
              Response
            </h2>
            <div className="response-content">
              {response.success ? (
                <pre className="response-pre success">
                  {JSON.stringify(response.success, null, 2)}
                </pre>
              ) : (
                <pre className="response-pre error" style={{ color: "red" }}>
                  {JSON.stringify(response.error, null, 2)}
                </pre>
              )}
            </div>{" "}
          </div>
        )}
        <h2 className="heading" style={{ fontSize: "4rem" }}>
          Check out Team
        </h2>
        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label htmlFor="deleteTeamNumber">
              Team <span className="highlight">Number</span>
            </label>
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
            <h2 className="response-heading" style={{ fontSize: "4rem" }}>
              Delete Response
            </h2>
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
