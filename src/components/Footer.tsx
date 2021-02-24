import React, {FC} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RSSchool from '../assets/images/rs_school_js.svg';
import { FaGithub } from "react-icons/fa";

const Footer: FC = () => {

    const classes = useStyles({});

    return (
        <footer className={classes.footer}>
            <div className={classes.linkGitHub}>
                <span className={classes.footerIcon}><FaGithub/></span>
                <a className={classes.link} href="https://github.com/AnnaDavydenko">Anna Davydenko</a>
            </div>
            <div>
                <div className={classes.linkSchool}>
                    <a className={classes.link} href="https://rs.school/js/">
                        <img src={RSSchool} alt="rs school logo"/>
                    </a>
                    <span> 2021</span>
                </div>
            </div>
        </footer>
    );
};

const useStyles = makeStyles({
    footer: {
        position: 'absolute',
        bottom: 0,
        color: '#3288dc',
        width: '100%',
        marginTop: '4rem',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        fontFamily: 'Hachi Maru Pop',
        fontSize: '1.3rem',
    },
    footerIcon: {
        color: '#3288dc',
        paddingRight: '0.5rem',
        '& svg': {
            verticalAlign: 'middle',
        },
    },
    link: {
        color: '#3288dc',
        outline: 'none',
        textDecoration: 'none',
        '&:hover':{
            color: '#01c5f1',
        }
    },
    linkSchool: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100px',
        '& img': {
            width: '55px',
            paddingRight: '0.5rem',
        },
    },
    linkGitHub: {
        display: 'flex',
        alignItems: 'center',
    },
});

export default Footer;

