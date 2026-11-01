import {Header} from "./components/Header.tsx";
import {Login} from "./components/Login.tsx";
import {Location} from "./data.ts";
import {Accounts} from "./components/Accounts.tsx";
import {Cash} from "./components/Cash.tsx";
import {Categories} from "./components/Categories.tsx";
import {Groups} from "./components/Groups.tsx";
import {CDelTransaction} from "./components/CDelTransaction.tsx";
import {Csv} from "./components/Csv.tsx";
import {EditTransaction} from "./components/EditTransaction.tsx";
import {NotFound} from "./components/NotFound.tsx";
import {Reports} from "./components/Reports.tsx";
import {Transactions} from "./components/Transactions.tsx";
import {useAppSelector} from "./reducer/store.ts";
import type {ReactNode} from "react";

const componentMap : {[key: string]: ReactNode} = {};

componentMap[Location.login] = <Login/>;
componentMap[Location.accounts] = <Accounts/>;
componentMap[Location.cash] = <Cash/>;
componentMap[Location.categories] = <Categories/>;
componentMap[Location.groups] = <Groups/>;
componentMap[Location.cDelTransaction] = <CDelTransaction/>;
componentMap[Location.csv] = <Csv/>;
componentMap[Location.editTransaction] = <EditTransaction/>;
componentMap[Location.reports] = <Reports/>;
componentMap[Location.transactions] = <Transactions/>;

function App() {

    const location = useAppSelector((state) => state.header.location)

    let component: any = null;
    if (location in componentMap) {
        component = componentMap[location];
    } else {
        component = <NotFound/>;
    }

  return (
      <div className={'app-container'}>
        <Header/>
        {component}
      </div>
  )
}

export default App
