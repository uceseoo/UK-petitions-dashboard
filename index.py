import dash
from dash import html
from dash import dcc
from dash.dependencies import Input, Output
import plotly.graph_objs as go
import pandas as pd

url_all_petitions = 'https://petition.parliament.uk/petitions.csv?state=all'

all_petitions = pd.read_csv(url_all_petitions)
print(all_petitions.head())

#petitions count
petitions_count_row = all_petitions.shape[0]

#open petitions
open_petitions= all_petitions.State.value_counts().open

#closed petitions
closed_petitions= all_petitions.State.value_counts().closed

#rejected petitions
rejected_petitions= all_petitions.State.value_counts().rejected

app = dash.Dash(__name__, )

app.layout= html.Div([
    html.Div([
        html.Div([
            html.Img(src=app.get_asset_url('UK-Petitions-Dashboard-logo.png'),
                     id='petition-image',
                     style={'height': '120px',
                            'width': 'auto',
                            'margin-bottom': '60px'})

        ], className='one-third column', style={'margin-bottom': '20px'}),

        html.Div([
            html.Div([
                html.H3('Petitions', style={'color': '#CDF7F3', 'margin-bottom': '50px', 'margin-left': '5px'})
            ])

        ], className='one-half column', id='title'),

        html.Div([
            html.H6('Last updated: ', style={'color': 'orange', 'margin-left': '40px', 'margin-right': '10px', 'font-size': '16px'})

        ], className= 'one-third column', id='title1', style={'margin-bottom': '50px'})

    ], id= 'header', className= 'row flex-display', style={'margin-bottom': '25px'}),

    html.Div([
        html.Div([
            html.H6(children='All Petitions', style={'textAlign': 'center', 'color': '#CDF7F3'}),
            html.P(f"{petitions_count_row:,.0f}", style={'textAlign': 'center',
                                                                'color': 'orange',
                                                                'fontSize': 25})

        ], className='card_container three columns', style={'margin-top': '5px'}),

        html.Div([
            html.H6(children='Open Petitions', style={'textAlign': 'center', 'color': '#CDF7F3'}),
            html.P(f"{open_petitions:,.0f}", style={'textAlign': 'center',
                                                                'color': '#dd1e35',
                                                                'fontSize': 25})

        ], className='card_container three columns', style={'margin-top': '5px'}),

        html.Div([
            html.H6(children='Closed Petitions', style={'textAlign': 'center', 'color': '#CDF7F3'}),
            html.P(f"{closed_petitions:,.0f}", style={'textAlign': 'center',
                                                                'color': 'orange',
                                                                'fontSize': 25})

        ], className='card_container three columns', style={'margin-top': '5px'}),

        html.Div([
            html.H6(children='Rejected Petitions', style={'textAlign': 'center', 'color': '#CDF7F3'}),
            html.P(f"{rejected_petitions:,.0f}", style={'textAlign': 'center',
                                                                'color': 'orange',
                                                                'fontSize': 25})

        ], className='card_container three columns', style={'margin-top': '5px'})

    ], className='row flex display'),


], id = 'mainContainer', style={'display': 'flex', 'flex-direction': 'column'})

if __name__ == '__main__':
    app.run_server(debug=True)
