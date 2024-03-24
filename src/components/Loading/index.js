export default function Loading({ loading }) {
	return loading ? (
		<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50">
			<div className="w-20 h-20 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
		</div>
	) : null;
}
