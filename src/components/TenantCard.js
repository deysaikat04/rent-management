import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        minHeight: 120,
        backgroundColor: '#8bc34a24',
        cursor: 'pointer',
        transition: '.2s ease',
        '&:hover': {
            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        },
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function TenantCard(props) {
    const classes = useStyles();
    const { tenant } = props;

    return (
        <Card className={classes.card} onClick={() => props.showTenant(tenant.id)}>
            <CardContent>

                <Typography variant="h5" component="h2">
                    {tenant.name}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {tenant.address}
                </Typography>
                <Typography variant="body2" component="p">
                    {tenant.mobileNo}
                </Typography>
            </CardContent>

        </Card>
    );
}
