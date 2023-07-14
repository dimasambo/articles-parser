import React, {FC} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {IArticle} from "../../types/article";
import {StyledArticlesLine} from "./StyledArticlesLine";

interface ArticlesLineProps {
    articles: IArticle[]
}

export const ArticlesLine: FC<ArticlesLineProps> = ({articles}) => {

    return (
        <StyledArticlesLine>
            {articles.map((article, index) => (
                <Card key={index} className={'card'}>
                    <CardHeader title={article.title} />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {article.content}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </StyledArticlesLine>
    );
};
