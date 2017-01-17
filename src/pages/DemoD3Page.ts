import Page from '../ui/Page';
import * as d3 from 'd3';

export default class DemoD3Page extends Page {
    static tag = 'eclipse-demod3';

    static createElement(): DemoD3Page {
        return <DemoD3Page> document.createElement(DemoD3Page.tag);
    }

    svg: HTMLElement;

    getName() {
        return 'D3 Demo';
    }

    attachedCallback() {
        this.style.height = '100%';

        this.svg = <HTMLElement> d3.select(this).append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .style('background', '#dff0d8')
            .node();

        this.render();
    }

    render() {
        //if (this.style.display && this.style.display !== 'none') {
            var chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];

            var bounds = this.svg.getBoundingClientRect();

            d3.select(this.svg)
                .selectAll('rect').data(chartdata)
                .enter().append('rect')
                .style('fill', '#3c763d')
                .style('stroke', '#d6e9c6')
                .style('stroke-width', '5')
                .attr('width', 40)
                .attr('height', data => data)
                .attr('x', (data, i) => i * (40 + 20))
                .attr('y', data => bounds.height - 100 - data);
        //}

        //requestAnimationFrame(() => this.render());
    }
}

(<any> document).registerElement(DemoD3Page.tag, DemoD3Page);
