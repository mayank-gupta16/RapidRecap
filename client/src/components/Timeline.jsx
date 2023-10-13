import TimelineItem from "./TimelineItem";

const Timeline = () => {
  return (
    <div className="px-5">
      <div className="timeline-container">
        <div className="intro">
          <div className="info">
            <h1>🌍 Stay Informed:</h1>
            <p className="mb-5">
              Explore the latest global developments, breaking news, and top
              stories from around the world. Our team of dedicated journalists
              and AI algorithms work tirelessly to bring you the most relevant
              and comprehensive news coverage.
            </p>
          </div>
          <div className="short">
            <h1>📰 Short and Sweet:</h1>
            <p>
              We understand that your time is valuable. That's why we provide
              concise and engaging summaries of the day's most important events.
              Get all the essential information you need in a format
              that's easy to digest.
            </p>
          </div>
        </div>
        <div className="row item-container">
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
          <div className="col-md-6 col-lg-4 item">
            <TimelineItem />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;
