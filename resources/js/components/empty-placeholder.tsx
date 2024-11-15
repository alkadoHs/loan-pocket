import React from "react";

const EmptyPlaceholder = () => {
    return (
        <>
            {/* a component that displays a placeholder when there is no data */}
            <div className="min-h-72 grid items-center justify-center">
                <div>
                    <img src="/nodata.png" alt="empty placeholder" />
                </div>
            </div>
        </>
    );
};

export default EmptyPlaceholder;
