import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus } from '../../Redux/filter/actionCreators';
import CardDiv from './CardDiv/CardDiv';
import FormDiv from './FormDiv/FormDiv';

const Body = () => {
    const filterState = useSelector(state => state.filter);
    const dispatch = useDispatch();
    
    // --- filtering booklist in the ui
    const filterBook = (status) => {
        dispatch(changeStatus(status));
    }
    return (
        <main className="py-12 2xl:px-6">
            <div className="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
                <div className="order-2 xl:-order-1">
                {/* ----------------- book list header ---------------- */}
                    <div className="flex items-center justify-between mb-12">
                        <h4 className="mt-2 text-xl font-bold">Book List</h4>

                        <div className="flex items-center space-x-4">
                            <button className={`filter-btn ${filterState.status === 'all' && 'active-filter'}`} id="lws-filterAll" onClick={()=>filterBook('all')}>All</button>
                            <button className={`filter-btn ${filterState.status === 'featured' && 'active-filter'}`}  id="lws-filterFeatured"  onClick={()=>filterBook('featured')}>Featured</button>
                        </div>
                    </div>
                {/* ----------------- book list header ends ----------- */}

                    <div className="lws-bookContainer">
                {/* <!--------------- Card div here ------------------> */}
                        <CardDiv></CardDiv>
                    </div>
                </div>

                {/* <!-- ------------ Form Div Here -------------- --> */}
                <div>
                    <FormDiv></FormDiv>
                </div>
            </div>
        </main>
    );
};

export default Body;