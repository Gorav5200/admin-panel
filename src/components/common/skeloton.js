import {Skeleton,TableRow,TableCell,Card,TableContainer} from "@mui/material"

export const SkeletonCards = () => {
    return (
      <>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 2,
            width: "100%",
            p: 2,
            boxShadow: 3,
            borderRadius: 5,
            border:"none"
            
          }}
        >
          <Skeleton animation="wave" variant="circular" width={50} height={50} />
          <Skeleton
            animation="wave"
            variant="rounded"
            // width="100%"
            height={60}
            style={{
              flexBasis: "auto",
              width: "100%",
              
              zIndex: 1,
            }}
          />
        </Card>
      </>
    );
  };


 export  const SkeletonTableRows = ({cell,row}) => {
    return (
      <TableContainer sx={{width:"100%"}}>
        {[...Array(row)].map((_, index) => (
          <TableRow key={index} sx={{ background: "white", width:"100%" }}>
            {[...Array(cell)].map((_, i) => (
              <TableCell key={i}>
                <Skeleton />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableContainer>
    );
  };