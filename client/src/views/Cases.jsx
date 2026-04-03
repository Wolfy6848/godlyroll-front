import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import parseCommasToThousands from "../utils/parseCommasToThousands";
import { getActiveCases } from "../services/api.service";
import { Grow } from "@material-ui/core";
import coin from "../assets/icons/Group.png";
import Background from "../assets/balance-background.png";

// Import all case images
import case1 from "../assets/cases/case1.png";
import case2 from "../assets/cases/case2.png";
import case3 from "../assets/cases/case3.png";
import case4 from "../assets/cases/case4.png";
import case5 from "../assets/cases/case5.png";
import case6 from "../assets/cases/case6.png";
import case7 from "../assets/cases/case7.png";
import case8 from "../assets/cases/case8.png";
import case9 from "../assets/cases/case9.png";
import case10 from "../assets/cases/case10.png";
import case11 from "../assets/cases/case11.png";
import case12 from "../assets/cases/case12.png";
import case13 from "../assets/cases/case13.png";
import case14 from "../assets/cases/case14.png";
import case15 from "../assets/cases/case15.png";
import case16 from "../assets/cases/case16.png";
import case17 from "../assets/cases/case17.png";
import case18 from "../assets/cases/case18.png";
import case19 from "../assets/cases/case19.png";
import case20 from "../assets/cases/case20.png";
import case21 from "../assets/cases/case21.png";
import case22 from "../assets/cases/case22.png";
import case23 from "../assets/cases/case23.png";
import case24 from "../assets/cases/case24.png";
import case25 from "../assets/cases/case25.png";
import case26 from "../assets/cases/case26.png";
import case27 from "../assets/cases/case27.png";
import case28 from "../assets/cases/case28.png";
import case29 from "../assets/cases/case29.png";
import case30 from "../assets/cases/case30.png";
import case31 from "../assets/cases/case31.png";
import case32 from "../assets/cases/case32.png";
import case33 from "../assets/cases/case33.png";
import case34 from "../assets/cases/case34.png";
import case35 from "../assets/cases/case35.png";
import case36 from "../assets/cases/case36.png";
import case37 from "../assets/cases/case37.png";
import case38 from "../assets/cases/case38.png";
import case39 from "../assets/cases/case39.png";
import case40 from "../assets/cases/case40.png";
import case41 from "../assets/cases/case41.png";
import case42 from "../assets/cases/case42.png";
import case43 from "../assets/cases/case43.png";
import case44 from "../assets/cases/case44.png";
import case45 from "../assets/cases/case45.png";
import case46 from "../assets/cases/case46.png";
import case47 from "../assets/cases/case47.png";
import case48 from "../assets/cases/case48.png";
import case49 from "../assets/cases/case49.png";
import case50 from "../assets/cases/case50.png";
import case51 from "../assets/cases/case51.png";
import case52 from "../assets/cases/case52.png";
import case53 from "../assets/cases/case53.png";
import case54 from "../assets/cases/case54.png";
import case55 from "../assets/cases/case55.png";
import case56 from "../assets/cases/case56.png";
import case57 from "../assets/cases/case57.png";
import case58 from "../assets/cases/case58.png";
import case59 from "../assets/cases/case59.png";
import case60 from "../assets/cases/case60.png";
import case61 from "../assets/cases/case61.png";
import case62 from "../assets/cases/case62.png";
import case63 from "../assets/cases/case63.png";
import case64 from "../assets/cases/case64.png";
import case65 from "../assets/cases/case65.png";
import case66 from "../assets/cases/case66.png";
import case67 from "../assets/cases/case67.png";
import case68 from "../assets/cases/case68.png";
import case69 from "../assets/cases/case69.png";
import case70 from "../assets/cases/case70.png";
import case71 from "../assets/cases/case71.png";
import case72 from "../assets/cases/case72.png";
import case73 from "../assets/cases/case73.png";
import case74 from "../assets/cases/case74.png";
import case75 from "../assets/cases/case75.png";
import case76 from "../assets/cases/case76.png";
import case77 from "../assets/cases/case77.png";
import case78 from "../assets/cases/case78.png";
import case79 from "../assets/cases/case79.png";
import case80 from "../assets/cases/case80.png";
import case81 from "../assets/cases/case81.png";
import case82 from "../assets/cases/case82.png";
import case83 from "../assets/cases/case83.png";
import case84 from "../assets/cases/case84.png";
import case85 from "../assets/cases/case85.png";
import case86 from "../assets/cases/case86.png";
import case87 from "../assets/cases/case87.png";
import case88 from "../assets/cases/case88.png";
import case89 from "../assets/cases/case89.png";
import case90 from "../assets/cases/case90.png";
import case91 from "../assets/cases/case91.png";
import case92 from "../assets/cases/case92.png";
import case93 from "../assets/cases/case93.png";
import case94 from "../assets/cases/case94.png";
import case95 from "../assets/cases/case95.png";
import case96 from "../assets/cases/case96.png";
import case97 from "../assets/cases/case97.png";
import case98 from "../assets/cases/case98.png";
import case99 from "../assets/cases/case99.png";
import case100 from "../assets/cases/case100.png";
import case101 from "../assets/cases/case101.png";
import case102 from "../assets/cases/case102.png";
import case103 from "../assets/cases/case103.png";
import case104 from "../assets/cases/case104.png";
import case105 from "../assets/cases/case105.png";
import case106 from "../assets/cases/case106.png";
import case107 from "../assets/cases/case107.png";
import case108 from "../assets/cases/case108.png";
import case109 from "../assets/cases/case109.png";
import case110 from "../assets/cases/case110.png";
import case111 from "../assets/cases/case111.png";
import case112 from "../assets/cases/case112.png";
import case113 from "../assets/cases/case113.png";
import case114 from "../assets/cases/case114.png";
import case115 from "../assets/cases/case115.png";
import case116 from "../assets/cases/case116.png";
import case117 from "../assets/cases/case117.png";
import case118 from "../assets/cases/case118.png";
import case119 from "../assets/cases/case119.png";
import case120 from "../assets/cases/case120.png";
import case121 from "../assets/cases/case121.png";
import case122 from "../assets/cases/case122.png";
import case123 from "../assets/cases/case123.png";
import case124 from "../assets/cases/case124.png";
import case125 from "../assets/cases/case125.png";
import case126 from "../assets/cases/case126.png";
import case127 from "../assets/cases/case127.png";
import case128 from "../assets/cases/case128.png";
import case129 from "../assets/cases/case129.png";
import case130 from "../assets/cases/case130.png";

const ColorCircularProgress = withStyles({
  root: {
    color: "#fff !important",
  },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
  root: {
    color: "#fff",
    width: "100%",
    maxWidth: "1250px",
    margin: "0 auto",
    overflowY: "scroll",
    scrollbarWidth: "none"
  },
  navContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: "1rem",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "0.25rem"
    },
  },
  navButton: {
    background: "#101123",
    border: "1px solid transparent",
    color: "rgb(162, 173, 195)",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    transitionDuration: "300ms",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(140%)"
    }
  },
  rotationContainer: {  
    gap: "0.75rem",
    display: "flex",
    padding: "0.5rem 1rem",
    border: "1px solid transparent",
    background: "#101123",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    userSelect: "none",
    borderRadius: "0.25rem",
    transitionDuration: "300ms",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(130%)",
    }
  },
  casesContainer: {
    display: "grid",
    columnGap: "0.5rem",
    rowGap: "0.5rem",
    overflowY: "scroll",
    scrollbarWidth: "none",
    width: "100%",
    height: "80vh",
    margin: "0 auto",
    overflow: "auto",
    paddingTop: 3,
    gridTemplateColumns: "repeat(auto-fill, minmax(15%, 1fr))",
    "@media (max-width: 1100px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(15%, 1fr))",
    },
    "@media (max-width: 700px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(25%, 1fr))",
    },
  },
  caseBox: {
    background: "#14151D",
    height: "16rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    cursor: "pointer",
    transitionDuration: "300ms",
    "&:hover": {
      filter: "brightness(130%)",
    },    
    [theme.breakpoints.down("md")]: {
      padding: "0.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem",
    },
  },
  imageContainer: {
    backgroundColor: "#14151D",
    borderRadius: "0.5rem",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  caseImage: {
    width: 150
  },
  priceContainer: {
    display: "flex",
    gap: "0.25rem",
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "baseline",
    backgroundColor: `#2B2D3D`,
    backgroundSize: "cover", 
    backgroundPosition: "center",
    borderRadius: "3px",
    fontSize: "13px",
    padding: "0.5rem",
    cursor: "pointer",
    color: "rgb(224, 228, 235)",
    marginBottom: "0.5rem",
  },
  button: {
    flex: "none",
    border: "none",
    cursor: "pointer",
    height: "2.25rem",
    display: "inline-flex",
    outline: "none",
    padding: "0 0.75rem",
    position: "relative",
    alignItems: "center",
    fontWeight: "bold",
    userSelect: "none",
    whiteSpace: "nowrap",
    willChange: "opacity",
    borderRadius: "0.25rem",
    justifyContent: "center",
    transitionDuration: "350ms",
    fontWeight: 500,
    color: "#9E9FBD",
    backgroundColor: "hsla(220, 100%, 82%, 0)",
    marginRight: "0.5rem",
    "&:hover": {
      backgroundColor: "#2B2D3D",
      filter: "brightness(130%)"
    }
  },
  buttonIcon: {
    marginRight: ".5em",
    fill: "currentColor",
    flex: "none",
    width: "1.25em",
    height: "1.25em",
    display: "inline-block",
    outline: "none",
  },
  textField: {
    transitionDuration: "200ms",
    width: "20rem",
    "& label": {
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 300,
      letterSpacing: ".1em",
      transitionDuration: "200ms",
    },
    "& label.Mui-focused": {
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontWeight: "300",
      transitionDuration: "200ms",
    },
    "& .MuiInput-underline:after": {
      border: "2px solid #3d5564",
      fontFamily: "Poppins",
      fontWeight: "300",
      transitionDuration: "200ms",
    },
    "& .MuiOutlinedInput-root": {
      
      "& fieldset": {
        border: "1px solid transparent",
        fontFamily: "Poppins",
        fontWeight: "300",
        transitionDuration: "200ms",
      },
      "&:hover fieldset": {
        border: "1px solid transparent",
        fontFamily: "Poppins",
        fontWeight: "300",
        transitionDuration: "200ms",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid hsl(220, 22%, 62%)",
        fontFamily: "Poppins",
        fontWeight: "300",
        transitionDuration: "200ms",
      },
    },
    "& .MuiInput-root": {
      border: "1px solid hsl(220, 22%, 62%)",
      fontFamily: "Poppins",
      fontWeight: "300",
      transitionDuration: "200ms",
      height: "2rem",
    },
    "&.MuiInputBase-root": {
      backgroundColor: "#101123",
      borderRadius: "6px",
      marginBottom: "10px",
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontWeight: "300",
      padding: "10px 10px",
      border: "1px solid transparent",
      "& > div > input": {
        color: "#e0e0e0",
        fontFamily: "Poppins",
        fontWeight: "300",
        border: "1px solid hsl(220, 22%, 62%)",
      },
    },
    "& > div > input": {
      backgroundColor: "#101123",
      borderRadius: "6px",
      transitionDuration: "200ms",
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontWeight: "300",
    },
  },
}));

const Cases = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState([]);
  const [sortType, setSortType] = useState("highest");
  const [searchInputState, setSearchInputState] = useState("");

  const preloadImages = () => {
    const caseImages = [
      case1, case2, case3, case4, case5, case6, case7, case8, case9, case10,
      case11, case12, case13, case14, case15, case16, case17, case18, case19, case20,
      case21, case22, case23, case24, case25, case26, case27, case28, case29, case30,
      case31, case32, case33, case34, case35, case36, case37, case38, case39, case40,
      case41, case42, case43, case44, case45, case46, case47, case48, case49, case50,
      case51, case52, case53, case54, case55, case56, case57, case58, case59, case60,
      case61, case62, case63, case64, case65, case66, case67, case68, case69, case70,
      case71, case72, case73, case74, case75, case76, case77, case78, case79, case80,
      case81, case82, case83, case84, case85, case86, case87, case88, case89, case90,
      case91, case92, case93, case94, case95, case96, case97, case98, case99, case100,
      case101, case102, case103, case104, case105, case106, case107, case108, case109, case110,
      case111, case112, case113, case114, case115, case116, case117, case118, case119, case120,
      case121, case122, case123, case124, case125, case126, case127, case128, case129, case130
    ];

    const imagePromises = caseImages.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    return Promise.all(imagePromises);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await preloadImages();
        const data = await getActiveCases();
        setCases(data);
      } catch (error) {
        console.log("There was an error getting active cases: " + error);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getActiveCases();
      setCases(data);
      setLoading(false);
    } catch (error) {
      console.log("There was an error getting active cases: " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div style={{display: "flex", margin: "auto"}}>
      <ColorCircularProgress />
    </div>
  ) : (
    <Grow in timeout={620}>
      <div className={classes.root}>
        <h3>Case Opening</h3>
        {/* Navigation and search code omitted for brevity */}
        <div className={classes.casesContainer}>
          {cases.filter((item) => item.name.toLowerCase().includes(searchInputState.toLowerCase())).sort((a, b) => b.price - a.price).map((item) => {
            return (
            <div className={classes.caseBox} key={item.id} onClick={() => history.push(`/cases/${item.slug}`)}>
              <div className={classes.imageContainer}>
                <img className={classes.caseImage} src={item.image} />
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div style={{color: "hsl(220, 22%, 85%)", fontSize: "12px"}}>{item.name}</div>
                <div style={{display: "flex", alignItems: "center", gap: "0.25rem"}}></div>
              </div>
              <div className={classes.priceContainer}>
                <img style={{height: 14, width: 14}} src={coin} />
                {parseCommasToThousands(parseFloat((item.price)))}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </Grow>
  );
};

export default Cases;