import Card from "./Card";

const TimelineItem = ({ newsNumber, data }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <Card newsNumber={newsNumber} data={data} />
      </div>
    </div>
  );
};

export default TimelineItem;
