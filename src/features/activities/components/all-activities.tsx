const AllActivities = () => {
  return <div>AllActivities</div>;
};

export default AllActivities;

/**
 * 여기서 const [page, setPage] = useState(1); 이런식으로 페이지를 관리하고, 
 * 
 * const fetchActivities = async (pageNumber: number) => {
  const response = await api.getActivities({ page: pageNumber });
  setActivities(response.activities);

  이렇게 작성해서 페이지네이션 컴포넌트를 불러오면 내가 페이지네이션 컴포넌트로 page값을 넘겨주고 페이지가 바뀌면 다음 페이지 영역만큼 api 재호출
  하는 느낌?
};
 */
