const PrintableSummary = ({ summaryData }) => {
  if (!summaryData || !summaryData.summary) return <div>No summary data.</div>;

  const points = summaryData.summary
    .split('\n\n')
    .map((point, index) => (
      <p key={index} style={{ marginBottom: '12px' }}>{point}</p>
    ));

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', color: '#000' }}>
      <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>{summaryData.title}</h1>
      <p><strong>Channel:</strong> {summaryData.channel}</p>
      <p><strong>Views:</strong> {summaryData.views}</p>
      <p><strong>Date:</strong> {new Date(summaryData.createdAt).toLocaleDateString()}</p>
      <hr style={{ margin: '20px 0' }} />
      <h2 style={{ fontSize: '18px' }}>Summary:</h2>
      {points}
    </div>
  );
};

export default PrintableSummary;
