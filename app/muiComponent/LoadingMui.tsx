import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingMui() {
  return (
    <div className="flex justify-center h-[80vh] items-center">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
}
