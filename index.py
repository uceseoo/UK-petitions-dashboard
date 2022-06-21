import dash
from dash import html
from dash import dcc
from dash.dependencies import Input, Output
import plotly.graph_objs as go
import pandas as pd

url_all_petitions = 'https://petition.parliament.uk/petitions.csv?state=all'

all_petitions = pd.read_csv(url_all_petitions)
all_petitions.head()
