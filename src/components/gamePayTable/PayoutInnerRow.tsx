import React from 'react';

function PayoutInnerRow(props: any) {
    return (
        <>
            {
                props.payout && Object.values(props.payout).reverse().map((item: any, i: number) => {
                    return (
                        <li key={i}>
                            {`${Object.keys(props.payout).reverse()[i]} : ${item * props.bet}`}
                        </li>
                    )
                })
            }
        </>
    )
}

export default PayoutInnerRow
