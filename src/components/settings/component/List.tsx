import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';

@inject('AppStore')
@observer
class List extends React.Component<IProps> {
    type: string = "";

    componentWillMount() {
        let { type } = this.props;
        this.type = type;
    }

    componentWillReceiveProps(){
        this.forceUpdate();
    }

    onDelete = (index:number)=>{
        console.log(index);
        this.props.AppStore.deleteList(this.type,index);
    }

    render() {
        let { data } = this.props;
        return (
            <>
                <antd.List
                    pagination={false}
                    bordered
                    locale={{ emptyText: "暂无数据"}}
                    dataSource={data}
                    renderItem={(item:string,index:number) => (
                        <antd.List.Item actions={[<a key="list-delete" onClick={this.onDelete.bind(this,index)}>删除</a>]}>
                            {item}
                        </antd.List.Item>
                    )}
                />
            </>
        )
    }
}

export default List