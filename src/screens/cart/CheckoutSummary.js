import React, { useState, useEffect } from "react";
import { Card, Divider, Button } from "react-native-paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems, setAddOrder } from "../../../Redux/actions/orderAction";
import { currencyIdrConverter } from "../../util/extensions";
import ReactMidtrans from "../../util/";
