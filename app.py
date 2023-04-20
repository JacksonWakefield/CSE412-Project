import streamlit as st
import pandas as pd
import numpy as np

title = st.title("hello world")

def remove():
    newthing = st.button("NEW BUTTON APPEARS")



button = st.button("click to remove title", on_click=remove())



