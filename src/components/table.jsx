import React from 'react';
import Button from './button';

const Table = ({ posts, onUpdate, onDelete }) => {
    return (
        <table className="table my-3">
            <thead>
                <tr>
                    <th>Tasks</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.name}</td>
                        <td>
                            <Button
                                className={'btn btn-info btn-sm'}
                                onClick={() => onUpdate(post)}
                                text={'Update'}
                            />
                        </td>

                        <td>
                            <Button
                                className={'btn btn-danger btn-sm'}
                                onClick={() => onDelete(post)}
                                text={'Delete'}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;