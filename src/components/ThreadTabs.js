import React from 'react';

class ThreadTabs extends React.PureComponent {
    render() {
        const { tabs } = this.props;
        return (
            <div className='ui top attached tabular menu'>
                {tabs.map((tab, index) => <div key={index} className={tab.active ? 'active item': 'item'}>{tab.title}</div>)}
            </div>
        )
    }
}

export default ThreadTabs;